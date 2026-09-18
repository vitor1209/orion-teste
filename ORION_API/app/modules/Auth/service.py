from fastapi import HTTPException
from pwdlib import PasswordHash
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from app.core.security import criar_access_token
from app.modules.Auth.repository import AuthRepository
from app.modules.Auth.schemas import (
    AuthResponse,
    LoginRequest,
)


class AuthService:
    def __init__(self, db: AsyncSession, repository: AuthRepository):
        self.db = db
        self.repository = repository
        self.password_hash = PasswordHash.recommended()

    async def login(self, obj: LoginRequest) -> AuthResponse:
        user = await self.repository.buscar_por_email(obj.Email)

        if not user:
            self.password_hash.hash(obj.Senha)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="E-mail ou senha inválidos",
            )

        if not self.password_hash.verify(obj.Senha, user.Senha):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="E-mail ou senha inválidos",
            )

        access_token = criar_access_token(data={"sub": str(user.Id)})

        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            Email=user.Email,
            Nome=user.Nome,
            UserId=user.Id,
        )
