from pydantic import EmailStr, field_validator

from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class UsuarioCreate(CreateSchema):
    Nome: str
    Email: EmailStr
    Senha: str
    Ativo: bool | None = True

    @field_validator("Email")
    @classmethod
    def normalizar_email(cls, v: str) -> str:
        return v.lower().strip()

class UsuarioUpdate(UpdateSchema):
    Nome: str | None = None
    Ativo: bool | None = None

class UsuarioResponse(ResponseSchema):
    Id: int
    Nome: str
    Email: EmailStr
    Ativo: bool