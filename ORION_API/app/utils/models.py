from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column


class CamposAuditoria:
    DataCadastro: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now()
    )
    DataAtualizacao: Mapped[datetime | None] = mapped_column(
        DateTime, nullable=True, onupdate=func.now()
    )