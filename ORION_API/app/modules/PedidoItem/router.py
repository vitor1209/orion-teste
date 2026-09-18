from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.PedidoItem.models import PedidoItem
from app.modules.PedidoItem.repository import PedidoItemRepository
from app.modules.PedidoItem.schemas import (
    PedidoItemCreate,
    PedidoItemResponse,
    PedidoItemUpdate,
)
from app.modules.PedidoItem.service import PedidoItemService

router = APIRouter(prefix="/pedido-item", tags=["PedidoItem"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> PedidoItemService:
    repo = PedidoItemRepository(db, PedidoItem)
    return PedidoItemService(db, repo)


ServiceDep = Annotated[PedidoItemService, Depends(get_service)]


@router.post("/", response_model=PedidoItemResponse)
async def criar(obj_in: PedidoItemCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=PedidoItemResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[PedidoItemResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)


@router.put("/{id}", response_model=PedidoItemResponse)
async def atualizar(id: int, obj_in: PedidoItemUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}