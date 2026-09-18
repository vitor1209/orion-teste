from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.DominioTipo.repository import DominioTipoRepository
from app.modules.DominioTipo.schemas import (
    DominioTipoCreate,
    DominioTipoResponse,
    DominioTipoUpdate,
)


class DominioTipoService:

    def __init__(self, db: AsyncSession, repository: DominioTipoRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: DominioTipoCreate) -> DominioTipoResponse:
        if len(obj.Codigo) < 3:
            raise ValueError("Código deve ter no mínimo 3 caracteres")
        return await self.repository.criar(obj)

    async def buscar(self, id: int) -> DominioTipoResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[DominioTipoResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: DominioTipoUpdate) -> DominioTipoResponse | None:
        if len(obj.Codigo) < 3:
            raise ValueError("Código deve ter no mínimo 3 caracteres")
        return await self.repository.atualizar(id, obj)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)