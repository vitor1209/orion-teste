from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class ProdutoCreate(CreateSchema):
    Nome: str
    Descricao: str | None = None
    Preco: float
    Estoque: int
    ImagemUrl: str | None = None
    Ativo: bool = True

class ProdutoUpdate(UpdateSchema):
    Id: int | None = None
    Nome: str | None = None
    Descricao: str | None = None
    Preco: float | None = None
    Estoque: int | None = None
    ImagemUrl: str | None = None
    Ativo: bool | None = None

class ProdutoResponse(ResponseSchema):
    Id: int
    Nome: str
    Descricao: str
    Preco: float
    Estoque: int
    ImagemUrl: str
    Ativo: bool