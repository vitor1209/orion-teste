from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class RegistroAtividade(Base, CamposAuditoria):
    __tablename__ = "RegistroAtividade"

    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    Usuario_id: Mapped[int] = mapped_column(
        "fk_Usuario_id",
        ForeignKey("Usuario.Id", ondelete="RESTRICT"),
        nullable=False,
    )
    Atividade_id: Mapped[int] = mapped_column(
        "fk_Atividade_id",
        ForeignKey("Atividade.Id", ondelete="RESTRICT"),
        nullable=False,
    )

    def __repr__(self) -> str:
        return (
            f"<RegistroAtividade id={self.Id} usuario_id={self.Usuario_id} "
            f"atividade_id={self.Atividade_id}>"
        )