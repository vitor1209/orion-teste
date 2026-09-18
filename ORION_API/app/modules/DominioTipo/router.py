from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.DominioTipo.models import DominioTipo
from app.modules.DominioTipo.repository import DominioTipoRepository
from app.modules.DominioTipo.schemas import (
    DominioTipoCreate,
    DominioTipoResponse,
    DominioTipoUpdate,
)
from app.modules.DominioTipo.service import DominioTipoService

router = APIRouter(prefix="/domino-tipo", tags=["Domínio Tipo"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> DominioTipoService:
    repo = DominioTipoRepository(db, DominioTipo)
    return DominioTipoService(db, repo)


ServiceDep = Annotated[DominioTipoService, Depends(get_service)]


@router.post("/", response_model=DominioTipoResponse)
async def criar(obj_in: DominioTipoCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=DominioTipoResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[DominioTipoResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)


@router.put("/{id}", response_model=DominioTipoResponse)
async def atualizar(id: int, obj_in: DominioTipoUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}