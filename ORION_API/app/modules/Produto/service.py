from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Produto.repository import ProdutoRepository
from app.modules.Produto.schemas import ProdutoCreate, ProdutoResponse, ProdutoUpdate


class ProdutoService:

    def __init__(self, db: AsyncSession, repository: ProdutoRepository):
        self.db = db
        self.repository = repository

    async def criar(self, obj: ProdutoCreate) -> ProdutoResponse:
        if obj.Estoque < 0:
            raise ValueError("Estoque deve ser no mínimo 0")
        if obj.Preco < 0:
            raise ValueError("Preco deve ser no mínimo 0")
        if len(obj.Nome) < 5:
            raise ValueError("Nome deve ter no mínimo 5 caracteres")
        return await self.repository.criar(obj)

    async def buscar(self, id: int) -> ProdutoResponse | None:
        return await self.repository.buscar(id)

    async def buscar_todos(self, limit: int = 100) -> list[ProdutoResponse]:
        return await self.repository.buscar_todos(limit)

    async def atualizar(self, id: int, obj: ProdutoUpdate) -> ProdutoResponse | None:
        if obj.Estoque < 0:
            raise ValueError("Estoque deve ser no mínimo 0")
        if obj.Preco < 0:
            raise ValueError("Preco deve ser no mínimo 0")
        if len(obj.Nome) < 5:
            raise ValueError("Nome deve ter no mínimo 5 caracteres")
        return await self.repository.atualizar(id, obj)

    async def deletar(self, id: int) -> bool:
        return await self.repository.deletar(id)