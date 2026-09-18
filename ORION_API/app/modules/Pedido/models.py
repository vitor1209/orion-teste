from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.utils.models import CamposAuditoria


class Pedido(Base, CamposAuditoria):
    __tablename__ = "Pedido"

    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    Usuario_id: Mapped[int] = mapped_column(
        "fk_Usuario_id",
        ForeignKey("Usuario.Id", ondelete="RESTRICT"),
        nullable=False
    )
    DominioStatus_id: Mapped[int] = mapped_column(
        "fk_DominioStatus_id",
        ForeignKey("Dominio.Id", ondelete="RESTRICT"),
        nullable=False
    )
    DominioFormaPagamento_id: Mapped[int] = mapped_column(
        "fk_DominioFormaPagamento_id",
        ForeignKey("Dominio.Id", ondelete="RESTRICT"),
        nullable=False
    )

    NomeCompleto: Mapped[str] = mapped_column(String(255), nullable=False)
    CPF: Mapped[str] = mapped_column(String(14), nullable=False)

    CEP: Mapped[str] = mapped_column(String(9), nullable=False)
    Logradouro: Mapped[str] = mapped_column(String(200), nullable=False)
    Numero: Mapped[str] = mapped_column(String(20), nullable=False)
    Complemento: Mapped[str] = mapped_column(String(100), nullable=True)
    Bairro: Mapped[str] = mapped_column(String(100), nullable=False)
    Cidade: Mapped[str] = mapped_column(String(100), nullable=False)
    Estado: Mapped[str] = mapped_column(String(100), nullable=False)

    Subtotal: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    Desconto: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    Frete: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    Total: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    usuario = relationship("Usuario", foreign_keys=[Usuario_id])
    status = relationship("Dominio", foreign_keys=[DominioStatus_id])
    forma_pagamento = relationship("Dominio", foreign_keys=[DominioFormaPagamento_id])

    def __repr__(self) -> str:
        return f"<Pedido id={self.Id} nome={self.NomeCompleto!r} cpf={self.CPF!r} subtotal={self.Subtotal!r} desconto={self.Desconto!r} frete={self.Frete!r} total={self.Total!r}>"