from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class Atividade(Base, CamposAuditoria):
    __tablename__ = "Atividade"

    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    CategoriaAtividade_id: Mapped[int] = mapped_column(
        "fk_CategoriaAtividade_id",
        ForeignKey("Dominio.Id", ondelete="RESTRICT"), nullable=False
    )

    TipoAtividade_id: Mapped[int] = mapped_column(
        "fk_TipoAtividade_id",
        ForeignKey("Dominio.Id", ondelete="RESTRICT"), nullable=False
    )

    Titulo: Mapped[str] = mapped_column(String(100), nullable=False)
    SubTitulo: Mapped[str] = mapped_column(String(100), nullable=True)

    Descricao: Mapped[str | None] = mapped_column(Text, nullable=True)

    Ordem: Mapped[int] = mapped_column(nullable=False)
    Chave: Mapped[str] = mapped_column(String(100), nullable=False)

    def __repr__(self) -> str:
        return f"<Atividade id={self.Id} titulo={self.Titulo!r} subtitulo={self.SubTitulo!r} descricao={self.Descricao!r}>"