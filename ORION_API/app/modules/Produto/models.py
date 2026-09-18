from sqlalchemy import DECIMAL, Boolean, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class Produto(Base, CamposAuditoria): 
    __tablename__ = "Produto"
 
    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
 
    Nome: Mapped[str] = mapped_column(String(150), nullable=False)
    Descricao: Mapped[str] = mapped_column(String(500), nullable=True)
 
    Preco: Mapped[DECIMAL] = mapped_column(Numeric(10, 2), nullable=False)
    Estoque: Mapped[int] = mapped_column(Integer, nullable=False)
    
    ImagemUrl: Mapped[str] = mapped_column(String(500), nullable=True)
 
    Ativo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, server_default="1")
 
    def __repr__(self) -> str:
        return f"<Produto id={self.Id} nome={self.Nome!r} descricao={self.Descricao!r} preco={self.Preco!r} estoque={self.Estoque!r} imagem={self.ImagemUrl!r} ativo={self.Ativo!r}>"