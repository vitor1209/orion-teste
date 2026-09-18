from pydantic import EmailStr, field_validator

from app.utils.schemas import CamelModel


class LoginRequest(CamelModel):
    Email: EmailStr
    Senha: str

    @field_validator("Email")
    @classmethod
    def normalizar_email(cls, v: str) -> str:
        return v.lower().strip()

class EmailRequest(CamelModel):
    Email: EmailStr


class CodigoValidacaoRequest(CamelModel):
    Email: EmailStr
    Codigo: str

class AuthResponse(CamelModel):
    access_token: str
    token_type: str = "bearer"
    Email: EmailStr
    Nome: str
    UserId: int