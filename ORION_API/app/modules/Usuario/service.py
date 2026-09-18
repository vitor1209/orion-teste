import asyncio

from pwdlib import PasswordHash
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Usuario.repository import UsuarioRepository
from app.modules.Usuario.schemas import (
    UsuarioCreate,
    UsuarioResponse,
    UsuarioUpdate,
)


class UsuarioService:

    def __init__(self, db: AsyncSession, repository: UsuarioRepository):
        self.db = db
        self.repository = repository
        self.password_hash = PasswordHash.recommended()

    async def criar(self, obj: UsuarioCreate) -> UsuarioResponse:
        obj.Senha = await asyncio.to_thread(self.password_hash.hash, obj.Senha)
        criado = await self.repository.criar(obj)
        return await self.repository.buscar(criado.Id)

    async def buscar(self, id: int) -> UsuarioResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[UsuarioResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: UsuarioUpdate) -> UsuarioResponse | None:
        atualizado = await self.repository.atualizar(id, obj)
        if not atualizado:
            return None
        return await self.repository.buscar(atualizado.Id)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)