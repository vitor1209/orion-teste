from sqlalchemy import select

from app.modules.Dominio.models import Dominio
from app.modules.Dominio.schemas import DominioCreate, DominioResponse, DominioUpdate
from app.modules.DominioTipo.models import DominioTipo
from app.utils.repository import BaseRepository


class DominioRepository(BaseRepository[Dominio, DominioCreate, DominioUpdate]):
    async def criar(self, obj_in: DominioCreate) -> DominioResponse:
        stmt = select(DominioTipo).where(
            DominioTipo.Codigo == obj_in.DominioTipo_codigo
        )

        result = await self.db.execute(stmt)
        dominio_tipo = result.scalar_one_or_none()

        if not dominio_tipo:
            raise ValueError("DominioTipo_codigo não encontrado")

        dominio_tipo_id = dominio_tipo.Id
        dominio_tipo_codigo = dominio_tipo.Codigo
        dominio_tipo_descricao = dominio_tipo.Descricao

        dados = obj_in.model_dump()
        dados.pop("DominioTipo_codigo")

        dados["DominioTipo_id"] = dominio_tipo_id

        db_obj = self.model(**dados)

        self.db.add(db_obj)

        await self.db.commit()
        await self.db.refresh(db_obj)

        return {
            "Id": db_obj.Id,
            "Codigo": db_obj.Codigo,
            "DominioTipo_id": dominio_tipo_id,
            "DominioTipoCodigo": dominio_tipo_codigo,
            "DominioTipoDescricao": dominio_tipo_descricao,
            "Descricao": db_obj.Descricao,
            "Ativo": db_obj.Ativo,
            "DataCadastro": db_obj.DataCadastro,
            "DataAtualizacao": db_obj.DataAtualizacao,
        }
        
    async def atualizar(self, id: int, obj_in: DominioUpdate) -> DominioResponse | None:
        db_obj = await self.db.get(self.model, id)

        if not db_obj:
            return None

        dados = obj_in.model_dump(exclude_unset=True, exclude={"Id"})

        if "DominioTipo_codigo" in dados:
            dominio_tipo_codigo = dados.pop("DominioTipo_codigo")

            stmt = select(DominioTipo).where(
                DominioTipo.Codigo == dominio_tipo_codigo
            )
            result = await self.db.execute(stmt)
            dominio_tipo = result.scalar_one_or_none()

            if not dominio_tipo:
                raise ValueError("DominioTipo_codigo não encontrado")

            dados["DominioTipo_id"] = dominio_tipo.Id

        for campo, valor in dados.items():
            setattr(db_obj, campo, valor)

        await self.db.commit()
        await self.db.refresh(db_obj)

        return await self.buscar(db_obj.Id)


    async def buscar(self, id: int) -> DominioResponse | None:
        stmt = (
            select(Dominio, DominioTipo.Codigo, DominioTipo.Descricao)
            .join(DominioTipo, Dominio.DominioTipo_id == DominioTipo.Id)
            .where(Dominio.Id == id)
        )
        result = await self.db.execute(stmt)
        row = result.first()

        if not row:
            return None

        dominio_obj, codigo_tipo, descricao_tipo = row.tuple()

        return DominioResponse(
            Id=dominio_obj.Id,
            Codigo=dominio_obj.Codigo,
            DominioTipo_id=dominio_obj.DominioTipo_id,
            DominioTipoCodigo=codigo_tipo,
            DominioTipoDescricao=descricao_tipo,
            Descricao=dominio_obj.Descricao,
            Ativo=dominio_obj.Ativo,
            DataCadastro=dominio_obj.DataCadastro,
            DataAtualizacao=dominio_obj.DataAtualizacao,
        )

    async def buscar_todos(self, limit: int = 100) -> list[DominioResponse]:
        stmt = (
            select(Dominio, DominioTipo.Codigo, DominioTipo.Descricao)
            .join(DominioTipo, Dominio.DominioTipo_id == DominioTipo.Id)
            .limit(limit)
        )

        result = await self.db.execute(stmt)
        rows: list[tuple[Dominio, str, str]] = result.tuples().all()

        return [
            DominioResponse(
                Id=dominio.Id,
                Codigo=dominio.Codigo,
                DominioTipo_id=dominio.DominioTipo_id,
                DominioTipoCodigo=codigo_tipo,
                DominioTipoDescricao=descricao_tipo,
                Descricao=dominio.Descricao,
                Ativo=dominio.Ativo,
                DataCadastro=dominio.DataCadastro,
                DataAtualizacao=dominio.DataAtualizacao,
            )
            for dominio, codigo_tipo, descricao_tipo in rows
        ]
