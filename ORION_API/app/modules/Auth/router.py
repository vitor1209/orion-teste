from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.modules.Auth.repository import AuthRepository
from app.modules.Auth.schemas import AuthResponse, LoginRequest
from app.modules.Auth.service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])

DbSession = Annotated[AsyncSession, Depends(get_db)]


def get_service(db: DbSession) -> AuthService:
    repo = AuthRepository(db)
    return AuthService(db, repo)


ServiceDep = Annotated[AuthService, Depends(get_service)]

@router.post("/login")
async def login(obj: LoginRequest, service: ServiceDep) -> AuthResponse:
    return await service.login(obj)