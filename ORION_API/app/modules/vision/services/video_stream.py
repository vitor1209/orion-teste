import asyncio
import os
import time

import cv2
import mediapipe as mp
import numpy as np

from app.modules.vision.config.detector import criar_detector
from app.modules.vision.config.Regras import REGRAS
from app.modules.vision.domain.mao import Mao
from app.modules.vision.services.identificador import Identificador

MAX_FRAME_BYTES = int(os.getenv("ORION_MAX_FRAME_BYTES", "2000000"))
JPEG_QUALITY = int(os.getenv("ORION_JPEG_QUALITY", "70"))

DRAW_IDS = os.getenv("ORION_DRAW_IDS", "false").lower() == "true"

class FrameTooLargeError(ValueError):
    pass

class VideoStreamService:
    def __init__(self, model_path, enviar_nota, tempo_minimo=0.2):
        self._model_path = model_path
        self._tempo_minimo = tempo_minimo
        self._enviar_nota = enviar_nota
        self._tarefas_envio = set()
        self._resultado = None
        self._nota_atual = None
        self._tempo_inicio = None

        self._mp_desenho = mp.tasks.vision.drawing_utils
        self._mp_estilo = mp.tasks.vision.drawing_styles
        self._mp_conexao = mp.tasks.vision.HandLandmarksConnections.HAND_CONNECTIONS
        self._identificador = Identificador(REGRAS)

        self._mp_deteccao = criar_detector(self._model_path, self._callback_resultado)

        self._inicio_ms = int(time.time() * 1000)

    def _timestamp_ms(self) -> int:
        return int(time.time() * 1000) - self._inicio_ms

    def _callback_resultado(self, result, output_image, timestamp_ms):
        self._resultado = result

    async def processar_video(self, frame_bytes: bytes) -> bytes:
        if len(frame_bytes) > MAX_FRAME_BYTES:
            raise FrameTooLargeError("Frame recebido excede o tamanho maximo permitido.")

        frame_anotado, nota_detectada = await asyncio.to_thread(
            self._processar_video_sync,
            frame_bytes,
        )

        if nota_detectada:
            self._agendar_envio_nota(nota_detectada)

        return frame_anotado

    def _processar_video_sync(self, frame_bytes: bytes) -> tuple[bytes, str | None]:
        nota_para_enviar = None

        array = np.frombuffer(frame_bytes, dtype=np.uint8)
        frame = cv2.imdecode(array, cv2.IMREAD_COLOR)

        if frame is None:
            return frame_bytes, None

        img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img_rgb)

        self._mp_deteccao.detect_async(
            image=mp_image,
            timestamp_ms=self._timestamp_ms(),
        )

        if self._resultado and self._resultado.hand_landmarks:
            for idx, hand_landmarks in enumerate(self._resultado.hand_landmarks):
                lado = self._resultado.handedness[idx][0].category_name
                mao = Mao(landmarks=hand_landmarks, lado_mao=lado)

                self._mp_desenho.draw_landmarks(
                    frame,
                    hand_landmarks,
                    self._mp_conexao,
                    self._mp_estilo.get_default_hand_landmarks_style(),
                    self._mp_estilo.get_default_hand_connections_style(),
                )

                if DRAW_IDS:
                    for landmark_id, lm in enumerate(hand_landmarks):
                        h, w, _ = frame.shape
                        cx, cy = int(lm.x * w), int(lm.y * h)
                        cv2.putText(
                            frame, str(landmark_id), (cx, cy),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2,
                        )

                nota_detectada = self._identificador.identificar(mao)
                agora = time.time()

                if nota_detectada == self._nota_atual:
                    if self._tempo_inicio and (agora - self._tempo_inicio) >= self._tempo_minimo:
                        nota_para_enviar = nota_detectada
                        self._tempo_inicio = None
                else:
                    self._nota_atual = nota_detectada
                    self._tempo_inicio = agora

        sucesso_encode, buffer = cv2.imencode(
            ".jpg", frame,
            [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY],
        )

        if not sucesso_encode:
            return frame_bytes, nota_para_enviar

        return buffer.tobytes(), nota_para_enviar

    def _agendar_envio_nota(self, nota: str):
        tarefa = asyncio.create_task(self._enviar_nota(nota))
        self._tarefas_envio.add(tarefa)
        tarefa.add_done_callback(self._finalizar_tarefa_envio)

    def _finalizar_tarefa_envio(self, tarefa):
        self._tarefas_envio.discard(tarefa)
        if not tarefa.cancelled():
            tarefa.exception()

    async def fechar_async(self):
        await asyncio.to_thread(self.fechar)

    def fechar(self):
        if self._mp_deteccao:
            self._mp_deteccao.close()
            self._mp_deteccao = None