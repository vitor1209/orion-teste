from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Atividade.repository import AtividadeRepository
from app.modules.Atividade.schemas import (
    AtividadeCreate,
    AtividadeResponse,
    AtividadeUpdate,
)


class AtividadeService:

    def __init__(self, db: AsyncSession, repository: AtividadeRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: AtividadeCreate) -> AtividadeResponse:
        if len(obj.Titulo) < 5:
            raise ValueError("Titulo deve ter no mínimo 5 caracteres")
        criado = await self.repository.criar(obj)
        return await self.repository.buscar(criado.Id)

    async def buscar(self, id: int) -> AtividadeResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[AtividadeResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: AtividadeUpdate) -> AtividadeResponse | None:
        if len(obj.Titulo) < 5:
            raise ValueError("Titulo deve ter no mínimo 5 caracteres")
        criado = await self.repository.atualizar(id, obj)
        return await self.repository.buscar(criado.Id)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)