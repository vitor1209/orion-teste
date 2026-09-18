from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Produto.models import Produto
from app.modules.Produto.repository import ProdutoRepository
from app.modules.Produto.schemas import ProdutoCreate, ProdutoResponse, ProdutoUpdate
from app.modules.Produto.service import ProdutoService

router = APIRouter(prefix="/produto", tags=["Produto"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> ProdutoService:
    repo = ProdutoRepository(db, Produto)
    return ProdutoService(db, repo)


ServiceDep = Annotated[ProdutoService, Depends(get_service)]


@router.post("/", response_model=ProdutoResponse)
async def criar(obj_in: ProdutoCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=ProdutoResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[ProdutoResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)


@router.put("/{id}", response_model=ProdutoResponse)
async def atualizar(id: int, obj_in: ProdutoUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}