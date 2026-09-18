from typing import Generic, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType")
UpdateSchemaType = TypeVar("UpdateSchemaType")

class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, db: AsyncSession, model: type[ModelType]):
        self.db = db
        self.model = model

    @staticmethod
    def _to_dict(obj: object, *, exclude_unset: bool = False) -> dict:
        if hasattr(obj, "model_dump"):
            return obj.model_dump(exclude_unset=exclude_unset)
        if hasattr(obj, "dict"):
            return obj.dict(exclude_unset=exclude_unset)
        return dict(obj)

    async def criar(self, obj_in: CreateSchemaType) -> ModelType:
        db_obj = self.model(**self._to_dict(obj_in))
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def buscar(self, id: int) -> ModelType | None:
        return await self.db.get(self.model, id)

    async def buscar_todos(self, limit: int = 100) -> list[ModelType]:
        stmt = select(self.model).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def atualizar(self, id: int, obj_in: UpdateSchemaType) -> ModelType | None:
        db_obj = await self.db.get(self.model, id)
        if db_obj:
            update_data = self._to_dict(obj_in, exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_obj, key, value)
            await self.db.commit()
            await self.db.refresh(db_obj)
        return db_obj

    async def deletar(self, id: int) -> bool:
        db_obj = await self.db.get(self.model, id)
        if db_obj:
            await self.db.delete(db_obj)
            await self.db.commit()
            return True
        return False