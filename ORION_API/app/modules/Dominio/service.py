from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Dominio.repository import DominioRepository
from app.modules.Dominio.schemas import DominioCreate, DominioResponse, DominioUpdate


class DominioService:

    def __init__(self, db: AsyncSession, repository: DominioRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: DominioCreate) -> DominioResponse:
        if len(obj.Codigo) < 3:
            raise ValueError("Código deve ter no mínimo 3 caracteres")
        return await self.repository.criar(obj)

    async def buscar(self, id: int) -> DominioResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[DominioResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: DominioUpdate) -> DominioResponse | None:
        if len(obj.Codigo) < 3:
            raise ValueError("Código deve ter no mínimo 3 caracteres")
        return await self.repository.atualizar(id, obj)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)