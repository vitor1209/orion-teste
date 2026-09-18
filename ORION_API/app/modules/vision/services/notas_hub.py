import asyncio
import logging
import os
from uuid import uuid4

from fastapi import WebSocket

logger = logging.getLogger(__name__)

SEND_TIMEOUT_SECONDS = float(os.getenv("ORION_WS_SEND_TIMEOUT_SECONDS", "1.0"))
SESSAO_QUERY_PARAM = "sessao"
MAX_SESSAO_LENGTH = 128


def obter_sessao(websocket: WebSocket) -> tuple[str, bool]:
    """Retorna (sessao, gerada_pelo_servidor) a partir da query string do websocket."""
    sessao = (websocket.query_params.get(SESSAO_QUERY_PARAM) or "").strip()

    if not sessao:
        return uuid4().hex, True

    return sessao[:MAX_SESSAO_LENGTH], False


class NotasHub:
    """Registro de clientes de notas, com no maximo um cliente ativo por sessao/aparelho."""

    def __init__(self, send_timeout_seconds: float = SEND_TIMEOUT_SECONDS):
        self._send_timeout_seconds = send_timeout_seconds
        self._clientes: dict[str, WebSocket] = {}

    def registrar(self, sessao: str, websocket: WebSocket) -> WebSocket | None:
        """Registra o cliente da sessao e devolve a conexao anterior, se existir."""
        anterior = self._clientes.get(sessao)
        self._clientes[sessao] = websocket

        if anterior is not None and anterior is not websocket:
            return anterior

        return None

    def remover(self, sessao: str, websocket: WebSocket) -> None:
        if self._clientes.get(sessao) is websocket:
            self._clientes.pop(sessao, None)

    async def enviar(self, sessao: str, nota) -> None:
        cliente = self._clientes.get(sessao)

        if cliente is None:
            logger.warning(
                "Nota descartada: nenhuma conexao /ws registrada para a sessao %s.",
                sessao,
            )
            return

        try:
            await asyncio.wait_for(
                cliente.send_json({"nota": nota}),
                timeout=self._send_timeout_seconds,
            )
        except Exception:
            logger.exception("Erro ao enviar nota para a sessao %s", sessao)
            self.remover(sessao, cliente)

    def criar_emissor(self, sessao: str):
        """Cria a funcao de envio de notas vinculada a uma unica sessao."""

        async def enviar_nota(nota):
            await self.enviar(sessao, nota)

        return enviar_nota


notas_hub = NotasHub()
