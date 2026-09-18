from datetime import datetime
from typing import TypeVar

from pydantic import BaseModel, ConfigDict

T = TypeVar('T')


def to_camel(name: str) -> str:
    """Converte nomes PascalCase/snake_case (inclusive mistos, ex.: 'DominioTipo_id') para camelCase,
    preservando a capitalização interna de cada parte."""
    parts = [p for p in name.split("_") if p]
    words = [p.capitalize() if p.isupper() else p for p in parts]
    if not words:
        return name
    first, *rest = words
    first = first[0].lower() + first[1:]
    return first + "".join(w[0].upper() + w[1:] for w in rest)


class CamelModel(BaseModel):
    """Base para schemas expostos em camelCase na API, mantendo os nomes de atributos internos"""
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class CamposAuditoriaSchema(CamelModel):
    """Campos padrão presentes em todos os schemas"""
    DataCadastro: datetime
    DataAtualizacao: datetime | None = None

class CreateSchema(CamelModel):
    """Para POST - sem ids, sem timestamps"""

class UpdateSchema(CamelModel):
    """Para PUT - campos opcionais"""

class ResponseSchema(CamposAuditoriaSchema):
    """Para GET - com todos os dados"""
    Id: int

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)