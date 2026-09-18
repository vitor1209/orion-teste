from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Atividade.models import Atividade
from app.modules.Atividade.repository import AtividadeRepository
from app.modules.Atividade.schemas import (
    AtividadeCreate,
    AtividadeResponse,
    AtividadeUpdate,
)
from app.modules.Atividade.service import AtividadeService

router = APIRouter(prefix="/atividade", tags=["Atividade"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> AtividadeService:
    repo = AtividadeRepository(db, Atividade)
    return AtividadeService(db, repo)


ServiceDep = Annotated[AtividadeService, Depends(get_service)]


@router.post("/", response_model=AtividadeResponse)
async def criar(obj_in: AtividadeCreate, service: ServiceDep):
    return await service.criar(obj_in)


@router.get("/{id}", response_model=AtividadeResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.get("/", response_model=list[AtividadeResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)


@router.put("/{id}", response_model=AtividadeResponse)
async def atualizar(id: int, obj_in: AtividadeUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj


@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}