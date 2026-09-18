from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Pedido.models import Pedido
from app.modules.Pedido.repository import PedidoRepository
from app.modules.Pedido.schemas import (
    PedidoCreate,
    PedidoResponse,
    PedidoUpdate,
)
from app.modules.Pedido.service import PedidoService

router = APIRouter(prefix="/pedido", tags=["Pedido"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> PedidoService:
    repo = PedidoRepository(db, Pedido)
    return PedidoService(db, repo)


ServiceDep = Annotated[PedidoService, Depends(get_service)]


@router.post("/", response_model=PedidoResponse)
async def criar(obj_in: PedidoCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=PedidoResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[PedidoResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)

@router.get("/por-usuario/{usuario_id}", response_model=list[PedidoResponse])
async def buscar_por_usuario(usuario_id: int, service: ServiceDep, limit: int = 100):
    return await service.buscar_por_usuario(usuario_id, limit)

@router.put("/{id}", response_model=PedidoResponse)
async def atualizar(id: int, obj_in: PedidoUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}