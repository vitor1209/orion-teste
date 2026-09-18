from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class Usuario(Base, CamposAuditoria): 
    __tablename__ = "Usuario"
 
    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
 
    Nome: Mapped[str] = mapped_column(String(150), nullable=False)
    Email: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
 
    Senha: Mapped[str] = mapped_column(String(300), nullable=False)
    
    Ativo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="1")
 
    def __repr__(self) -> str:
        return f"<Usuario id={self.Id} nome={self.Nome!r} email={self.Email!r} ativo={self.Ativo!r}>"