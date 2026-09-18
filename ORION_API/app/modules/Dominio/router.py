from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Dominio.models import Dominio
from app.modules.Dominio.repository import DominioRepository
from app.modules.Dominio.schemas import DominioCreate, DominioResponse, DominioUpdate
from app.modules.Dominio.service import DominioService

router = APIRouter(prefix="/domino", tags=["Domínio"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> DominioService:
    repo = DominioRepository(db, Dominio)
    return DominioService(db, repo)


ServiceDep = Annotated[DominioService, Depends(get_service)]


@router.post("/", response_model=DominioResponse)
async def criar(obj_in: DominioCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=DominioResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[DominioResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)


@router.put("/{id}", response_model=DominioResponse)
async def atualizar(id: int, obj_in: DominioUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}