from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class PedidoItemCreate(CreateSchema):
    Pedido_id: int
    Produto_id: int
    Quantidade: int
    PrecoUnitario: float
    Desconto: float
    SubtotalItem: float


class PedidoItemUpdate(UpdateSchema):
    Id: int | None = None
    Pedido_id: int | None = None
    Produto_id: int | None = None
    Quantidade: int | None = None
    PrecoUnitario: float | None = None
    Desconto: float | None = None
    SubtotalItem: float | None = None


class PedidoItemResponse(ResponseSchema):
    Id: int
    Pedido_id: int
    Produto_id: int
    Quantidade: int
    PrecoUnitario: float
    Desconto: float
    SubtotalItem: float
