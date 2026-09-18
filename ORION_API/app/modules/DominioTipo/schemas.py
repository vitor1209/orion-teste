from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class DominioTipoCreate(CreateSchema):
    Codigo: str
    Descricao: str
    Ativo: bool = True
    
class DominioTipoUpdate(UpdateSchema):
    Codigo: str | None = None
    Descricao: str | None = None
    Ativo: bool | None = None

class DominioTipoResponse(ResponseSchema):
    Codigo: str
    Descricao: str
    Ativo: bool