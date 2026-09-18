from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class AtividadeCreate(CreateSchema):
    CategoriaAtividade_codigo: str
    TipoAtividade_codigo: str
    Titulo: str
    SubTitulo: str | None
    Descricao: str | None
    Ordem: int
    Chave: str


class AtividadeUpdate(UpdateSchema):
    Id: int | None = None
    CategoriaAtividade_codigo: str | None = None
    TipoAtividade_codigo: str | None = None
    Titulo: str | None = None
    SubTitulo: str | None = None
    Descricao: str | None = None
    Ordem: int | None = None
    Chave: str | None = None


class AtividadeResponse(ResponseSchema):
    Id: int
    Categoria: str
    Tipo: str
    Titulo: str
    SubTitulo: str | None
    Descricao: str | None
    Ordem: int
    Chave: str