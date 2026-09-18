import asyncio
import logging
import os

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.modules.vision.services.notas_hub import (
    SESSAO_QUERY_PARAM,
    notas_hub,
    obter_sessao,
)
from app.modules.vision.services.video_stream import FrameTooLargeError

logger = logging.getLogger(__name__)

MAX_FILA = int(os.getenv("MAX_FILA", "2"))
IDLE_TIMEOUT_SECONDS = float(os.getenv("ORION_WS_IDLE_TIMEOUT_SECONDS", "300.0"))
HEARTBEAT_SECONDS = float(os.getenv("ORION_WS_HEARTBEAT_SECONDS", "180.0"))


async def _heartbeat(websocket: WebSocket, interval_seconds: float):
    try:
        while True:
            await asyncio.sleep(interval_seconds)
            try:
                await websocket.send_json({"type": "heartbeat"})
            except Exception:
                logger.exception("Erro ao enviar heartbeat no websocket /video")
    except asyncio.CancelledError:
        pass


def get_router(video_stream_factory):
    router = APIRouter()
    streams_ativos = set()

    @router.websocket("/video")
    async def video_websocket(websocket: WebSocket):

        await websocket.accept()

        sessao, sessao_gerada = obter_sessao(websocket)

        if sessao_gerada:
            logger.warning(
                "WebSocket /video conectado sem parametro '%s'; sessao %s gerada pelo servidor.",
                SESSAO_QUERY_PARAM,
                sessao,
            )

        await _enviar_sessao(websocket, sessao)

        video_stream = video_stream_factory(notas_hub.criar_emissor(sessao))
        streams_ativos.add(video_stream)
        heartbeat_task = asyncio.create_task(_heartbeat(websocket, HEARTBEAT_SECONDS))

        fila = asyncio.Queue(maxsize=MAX_FILA)

        async def receber():
            try:
                while True:
                    frame_bytes = await asyncio.wait_for(
                        websocket.receive_bytes(),
                        timeout=IDLE_TIMEOUT_SECONDS,
                    )

                    if fila.full():
                        try:
                            fila.get_nowait()
                        except asyncio.QueueEmpty:
                            pass

                    await fila.put(frame_bytes)

            except asyncio.TimeoutError:
                logger.info("WebSocket /video inativo por %s segundos; fechando conexao.", IDLE_TIMEOUT_SECONDS)
            except WebSocketDisconnect:
                pass
            except Exception:
                logger.exception("Erro ao receber frame no websocket /video")
            finally:
                try:
                    fila.put_nowait(None)
                except asyncio.QueueFull:
                    try:
                        fila.get_nowait()
                    except asyncio.QueueEmpty:
                        pass
                    fila.put_nowait(None)

        async def processar():
            try:
                while True:
                    frame_bytes = await fila.get()

                    if frame_bytes is None:
                        break

                    try:
                        frame_anotado = await video_stream.processar_video(frame_bytes)
                        await websocket.send_bytes(frame_anotado)
                    except FrameTooLargeError:
                        await _fechar_websocket(websocket, code=1009)
                        break
                    except Exception:
                        logger.exception("Erro ao processar frame no websocket /video")
                        await _fechar_websocket(websocket, code=1011)
                        break

            except Exception:
                logger.exception("Erro inesperado no loop de processamento")

        tasks = {
            asyncio.create_task(receber()),
            asyncio.create_task(processar()),
        }

        try:
            done, pending = await asyncio.wait(
                tasks, return_when=asyncio.FIRST_COMPLETED
            )

            await _fechar_websocket(websocket)

            for task in pending:
                task.cancel()
                try:
                    await task
                except asyncio.CancelledError:
                    pass
                except Exception:
                    logger.exception("Erro ao cancelar task pendente")

            for task in done:
                exc = task.exception()
                if exc:
                    logger.exception("Task concluída com erro", exc_info=exc)

        finally:
            heartbeat_task.cancel()
            try:
                await heartbeat_task
            except asyncio.CancelledError:
                pass
            streams_ativos.discard(video_stream)
            await video_stream.fechar_async()

    return router


async def _fechar_websocket(websocket: WebSocket, code: int = 1000):
    try:
        await websocket.close(code=code)
    except Exception:
        logger.exception("Erro ao fechar websocket")


async def _enviar_sessao(websocket: WebSocket, sessao: str):
    try:
        await websocket.send_json({"type": "sessao", "sessao": sessao})
    except Exception:
        logger.exception("Erro ao informar a sessao %s ao cliente", sessao)


router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    sessao, sessao_gerada = obter_sessao(websocket)
    conexao_anterior = notas_hub.registrar(sessao, websocket)

    if conexao_anterior is not None:
        logger.info(
            "Nova conexao /ws para a sessao %s; encerrando a conexao anterior.",
            sessao,
        )
        await _fechar_websocket(conexao_anterior, code=1012)

    if sessao_gerada:
        logger.warning(
            "WebSocket /ws conectado sem parametro '%s'; sessao %s gerada pelo servidor.",
            SESSAO_QUERY_PARAM,
            sessao,
        )

    await _enviar_sessao(websocket, sessao)

    heartbeat_task = asyncio.create_task(_heartbeat(websocket, HEARTBEAT_SECONDS))

    try:
        while True:
            await asyncio.wait_for(
                websocket.receive_text(),
                timeout=IDLE_TIMEOUT_SECONDS,
            )
    except asyncio.TimeoutError:
        logger.info("WebSocket /ws inativo por %s segundos; fechando conexao.", IDLE_TIMEOUT_SECONDS)
    except WebSocketDisconnect:
        pass
    except Exception:
        logger.exception("Erro no websocket /ws")
    finally:
        heartbeat_task.cancel()
        try:
            await heartbeat_task
        except asyncio.CancelledError:
            pass
        notas_hub.remover(sessao, websocket)
