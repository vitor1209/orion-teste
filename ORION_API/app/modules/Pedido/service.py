from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Pedido.repository import PedidoRepository
from app.modules.Pedido.schemas import (
    PedidoCreate,
    PedidoResponse,
    PedidoUpdate,
)


class PedidoService:

    def __init__(self, db: AsyncSession, repository: PedidoRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: PedidoCreate) -> PedidoResponse:
        return await self.repository.criar(obj)

    async def buscar(self, id: int) -> PedidoResponse | None:
        return await self.repository.buscar(id)
    
    async def buscar_por_usuario(self, usuario_id: int, limit: int = 100) -> list[PedidoResponse]:
        return await self.repository.buscar_por_usuario(usuario_id, limit)

    async def buscar_todos(self, limit: int = 100) -> list[PedidoResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: PedidoUpdate) -> PedidoResponse | None:
        return await self.repository.atualizar(id, obj)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)