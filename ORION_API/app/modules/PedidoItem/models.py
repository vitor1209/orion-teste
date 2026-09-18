from decimal import Decimal

from sqlalchemy import ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.utils.models import CamposAuditoria


class PedidoItem(Base, CamposAuditoria):
    __tablename__ = "PedidoItem"

    Id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    Pedido_id: Mapped[int] = mapped_column(
        "fk_Pedido_id",
        ForeignKey("Pedido.Id", ondelete="RESTRICT"),
        nullable=False,
    )
    Produto_id: Mapped[int] = mapped_column(
        "fk_Produto_id",
        ForeignKey("Produto.Id", ondelete="RESTRICT"),
        nullable=False,
    )

    Quantidade: Mapped[int] = mapped_column(Integer, nullable=False)
    PrecoUnitario: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    Desconto: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    SubtotalItem: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)

    def __repr__(self) -> str:
        return (
            f"<PedidoItem id={self.Id} pedido_id={self.Pedido_id} produto_id={self.Produto_id} "
            f"quantidade={self.Quantidade} subtotal_item={self.SubtotalItem!r}>"
        )
