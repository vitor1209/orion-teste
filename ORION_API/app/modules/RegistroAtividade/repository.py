from sqlalchemy import select

from app.modules.RegistroAtividade.models import RegistroAtividade
from app.modules.RegistroAtividade.schemas import (
    RegistroAtividadeCreate,
    RegistroAtividadeUpdate,
)
from app.utils.repository import BaseRepository


class RegistroAtividadeRepository(
    BaseRepository[RegistroAtividade, RegistroAtividadeCreate, RegistroAtividadeUpdate]
):
    async def buscar_por_usuario(self, usuario_id: int, limit: int = 100):
        stmt = (
            select(self.model)
            .where(self.model.Usuario_id == usuario_id)
            .limit(limit)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())
    