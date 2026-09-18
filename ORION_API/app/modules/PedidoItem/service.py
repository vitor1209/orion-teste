from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.PedidoItem.repository import PedidoItemRepository
from app.modules.PedidoItem.schemas import (
    PedidoItemCreate,
    PedidoItemResponse,
    PedidoItemUpdate,
)


class PedidoItemService:
    def __init__(self, db: AsyncSession, repository: PedidoItemRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: PedidoItemCreate) -> PedidoItemResponse:
        criado = await self.repository.criar(obj)
        return await self.repository.buscar(criado.Id)

    async def buscar(self, id: int) -> PedidoItemResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[PedidoItemResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: PedidoItemUpdate) -> PedidoItemResponse | None:
        atualizado = await self.repository.atualizar(id, obj)
        if not atualizado:
            return None
        return await self.repository.buscar(atualizado.Id)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)