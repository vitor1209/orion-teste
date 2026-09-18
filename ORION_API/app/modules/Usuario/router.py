from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Usuario.models import Usuario
from app.modules.Usuario.repository import UsuarioRepository
from app.modules.Usuario.schemas import (
    UsuarioCreate,
    UsuarioResponse,
    UsuarioUpdate,
)
from app.modules.Usuario.service import UsuarioService

router = APIRouter(prefix="/usuario", tags=["Usuario"])
router_publico = APIRouter(prefix="/usuario", tags=["Usuario"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> UsuarioService:
    repo = UsuarioRepository(db, Usuario)
    return UsuarioService(db, repo)


ServiceDep = Annotated[UsuarioService, Depends(get_service)]


@router_publico.post("/", response_model=UsuarioResponse)
async def criar(obj_in: UsuarioCreate, service: ServiceDep):
    return await service.criar(obj_in)

@router.get("/{id}", response_model=UsuarioResponse)
async def buscar(id: int, service: ServiceDep):
    obj = await service.buscar(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj

@router.get("/", response_model=list[UsuarioResponse])
async def buscar_todos(service: ServiceDep, limit: int = 100):
    return await service.buscar_todos(limit)

@router.put("/{id}", response_model=UsuarioResponse)
async def atualizar(id: int, obj_in: UsuarioUpdate, service: ServiceDep):
    obj = await service.atualizar(id, obj_in)
    if not obj:
        raise HTTPException(status_code=404, detail="Não encontrado")
    return obj

@router.delete("/{id}")
async def deletar(id: int, service: ServiceDep):
    if not await service.deletar(id):
        raise HTTPException(status_code=404, detail="Não encontrado")
    return {"deleted": True}