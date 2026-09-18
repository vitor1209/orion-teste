from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class PedidoCreate(CreateSchema):
    Usuario_id: int
    DominioStatus_id: int
    DominioFormaPagamento_id: int
    NomeCompleto: str
    CPF: str
    CEP: str
    Logradouro: str
    Numero: str
    Complemento: str | None = None
    Bairro: str
    Cidade: str
    Estado: str
    Subtotal: float
    Desconto: float
    Frete: float
    Total: float


class PedidoUpdate(UpdateSchema):
    Id: int | None = None
    Usuario_id: int | None = None
    DominioStatus_id: int | None = None
    DominioFormaPagamento_id: int | None = None
    NomeCompleto: str | None = None
    CPF: str | None = None
    CEP: str | None = None
    Logradouro: str | None = None
    Numero: str | None = None
    Complemento: str | None = None
    Bairro: str | None = None
    Cidade: str | None = None
    Estado: str | None = None
    Subtotal: float | None = None
    Desconto: float | None = None
    Frete: float | None = None
    Total: float | None = None

class PedidoResponse(ResponseSchema):
    Usuario_id: int
    Status: str
    FormaPagamento: str
    NomeCompleto: str
    CPF: str
    CEP: str
    Logradouro: str
    Numero: str
    Complemento: str | None = None
    Bairro: str
    Cidade: str
    Estado: str
    Subtotal: float
    Desconto: float
    Frete: float
    Total: float