from sqlalchemy import Boolean, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.utils.models import CamposAuditoria


class Dominio(Base, CamposAuditoria): 
    __tablename__ = "Dominio"
 
    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    DominioTipo_id: Mapped[int] = mapped_column(
        "fk_DominioTipo_id",
        ForeignKey("DominioTipo.Id", ondelete="RESTRICT"),
        nullable=False
    )
 
    Codigo: Mapped[str] = mapped_column(String(50), nullable=False)
    Descricao: Mapped[str] = mapped_column(String(150), nullable=False)
 
    Ativo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="1")

    dominio_tipo = relationship("DominioTipo", foreign_keys=[DominioTipo_id])

 
    def __repr__(self) -> str:
        return f"<Dominio id={self.Id} codigo={self.Codigo!r} descricao={self.Descricao!r}>"
    