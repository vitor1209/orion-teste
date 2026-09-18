from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.Usuario.models import Usuario


class AuthRepository:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def buscar_por_email(self, email: str) -> Usuario | None:
        stmt = select(Usuario).where(Usuario.Email == email)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
        