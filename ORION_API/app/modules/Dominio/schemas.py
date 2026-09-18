from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class DominioCreate(CreateSchema):
    Codigo: str
    DominioTipo_codigo: str
    Descricao: str
    Ativo: bool = True

class DominioUpdate(UpdateSchema):
    Id: int
    Codigo: str | None = None
    DominioTipo_codigo: str | None = None
    Descricao: str | None = None
    Ativo: bool | None = None

class DominioResponse(ResponseSchema):
    Id: int
    Codigo: str
    DominioTipo_id: int
    DominioTipoCodigo: str
    DominioTipoDescricao: str
    Descricao: str
    Ativo: bool