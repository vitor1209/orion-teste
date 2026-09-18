from app.utils.schemas import CreateSchema, ResponseSchema, UpdateSchema


class RegistroAtividadeCreate(CreateSchema):
    Usuario_id: int
    Atividade_id: int


class RegistroAtividadeUpdate(UpdateSchema):
    Id: int | None = None
    Usuario_id: int | None = None
    Atividade_id: int | None = None


class RegistroAtividadeResponse(ResponseSchema):
    Id: int
    Usuario_id: int
    Atividade_id: int