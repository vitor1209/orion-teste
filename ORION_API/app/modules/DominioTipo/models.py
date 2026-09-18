from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class DominioTipo(Base, CamposAuditoria): 
    __tablename__ = "DominioTipo"
 
    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
 
    Codigo: Mapped[str] = mapped_column(String(50), nullable=False)
    Descricao: Mapped[str] = mapped_column(String(150), nullable=False)
 
    Ativo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="1")
 
    def __repr__(self) -> str:
        return f"<DominioTipo id={self.Id} codigo={self.Codigo!r} descricao={self.Descricao!r}>"