from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.RegistroAtividade.repository import RegistroAtividadeRepository
from app.modules.RegistroAtividade.schemas import (
    RegistroAtividadeCreate,
    RegistroAtividadeResponse,
    RegistroAtividadeUpdate,
)


class RegistroAtividadeService:
    def __init__(self, db: AsyncSession, repository: RegistroAtividadeRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: RegistroAtividadeCreate) -> RegistroAtividadeResponse:
        criado = await self.repository.criar(obj)
        return await self.repository.buscar(criado.Id)

    async def buscar(self, id: int) -> RegistroAtividadeResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[RegistroAtividadeResponse]:
        return await self.repository.buscar_todos(limit)

    async def buscar_por_usuario(self, usuario_id: int, limit: int = 100) -> list[RegistroAtividadeResponse]:
        return await self.repository.buscar_por_usuario(usuario_id, limit)

    async def atualizar(self, id: int, obj: RegistroAtividadeUpdate) -> RegistroAtividadeResponse | None:
        atualizado = await self.repository.atualizar(id, obj)
        if not atualizado:
            return None
        return await self.repository.buscar(atualizado.Id)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)