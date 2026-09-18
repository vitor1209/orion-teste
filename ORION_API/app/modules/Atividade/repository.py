from sqlalchemy import select
from sqlalchemy.orm import aliased

from app.modules.Atividade.models import Atividade
from app.modules.Atividade.schemas import (
    AtividadeCreate,
    AtividadeResponse,
    AtividadeUpdate,
)
from app.modules.Dominio.models import Dominio
from app.utils.repository import BaseRepository

DominioCategoria = aliased(Dominio)
DominioTipo = aliased(Dominio)


class AtividadeRepository(BaseRepository[Atividade, AtividadeCreate, AtividadeUpdate]):
    async def _buscar_dominio_id(self, codigo: str) -> int:
        stmt = select(Dominio).where(Dominio.Codigo == codigo)
        result = await self.db.execute(stmt)
        dominio = result.scalar_one_or_none()

        if not dominio:
            raise ValueError(f"Codigo '{codigo}' não encontrado em Dominio")

        return dominio.Id

    async def criar(self, obj_in: AtividadeCreate) -> AtividadeResponse:
        categoria_id = await self._buscar_dominio_id(obj_in.CategoriaAtividade_codigo)
        tipo_id = await self._buscar_dominio_id(obj_in.TipoAtividade_codigo)

        dados = obj_in.model_dump()
        dados.pop("CategoriaAtividade_codigo")
        dados.pop("TipoAtividade_codigo")

        dados["CategoriaAtividade_id"] = categoria_id
        dados["TipoAtividade_id"] = tipo_id

        db_obj = self.model(**dados)

        self.db.add(db_obj)

        await self.db.commit()
        await self.db.refresh(db_obj)

        return await self.buscar(db_obj.Id)

    async def atualizar(self, id: int, obj_in: AtividadeUpdate) -> AtividadeResponse | None:
        db_obj = await self.db.get(self.model, id)

        if not db_obj:
            return None

        dados = obj_in.model_dump(exclude_unset=True, exclude={"Id"})

        if "CategoriaAtividade_codigo" in dados:
            categoria_codigo = dados.pop("CategoriaAtividade_codigo")
            dados["CategoriaAtividade_id"] = await self._buscar_dominio_id(categoria_codigo)

        if "TipoAtividade_codigo" in dados:
            tipo_codigo = dados.pop("TipoAtividade_codigo")
            dados["TipoAtividade_id"] = await self._buscar_dominio_id(tipo_codigo)

        for campo, valor in dados.items():
            setattr(db_obj, campo, valor)

        await self.db.commit()
        await self.db.refresh(db_obj)

        return await self.buscar(db_obj.Id)

    async def buscar(self, id: int) -> AtividadeResponse | None:
        stmt = (
            select(Atividade, DominioCategoria.Descricao, DominioTipo.Descricao)
            .join(DominioCategoria, Atividade.CategoriaAtividade_id == DominioCategoria.Id)
            .join(DominioTipo, Atividade.TipoAtividade_id == DominioTipo.Id)
            .where(Atividade.Id == id)
        )
        result = await self.db.execute(stmt)
        row = result.first()

        if not row:
            return None

        atividade_obj, descricao_categoria, descricao_tipo = row.tuple()

        return AtividadeResponse(
            Id=atividade_obj.Id,
            Categoria=descricao_categoria,
            Tipo=descricao_tipo,
            Titulo=atividade_obj.Titulo,
            SubTitulo=atividade_obj.SubTitulo,
            Descricao=atividade_obj.Descricao,
            Ordem=atividade_obj.Ordem,
            Chave=atividade_obj.Chave,
            DataCadastro=atividade_obj.DataCadastro,
            DataAtualizacao=atividade_obj.DataAtualizacao,
        )

    async def buscar_todos(self, limit: int = 100) -> list[AtividadeResponse]:
        stmt = (
            select(Atividade, DominioCategoria.Descricao, DominioTipo.Descricao)
            .join(DominioCategoria, Atividade.CategoriaAtividade_id == DominioCategoria.Id)
            .join(DominioTipo, Atividade.TipoAtividade_id == DominioTipo.Id)
            .limit(limit)
        )

        result = await self.db.execute(stmt)
        rows: list[tuple[Atividade, str, str]] = result.tuples().all()

        return [
            AtividadeResponse(
                Id=atividade_obj.Id,
                Categoria=descricao_categoria,
                Tipo=descricao_tipo,
                Titulo=atividade_obj.Titulo,
                SubTitulo=atividade_obj.SubTitulo,
                Descricao=atividade_obj.Descricao,
                Ordem=atividade_obj.Ordem,
                Chave=atividade_obj.Chave,
                DataCadastro=atividade_obj.DataCadastro,
                DataAtualizacao=atividade_obj.DataAtualizacao,
            )
            for atividade_obj, descricao_categoria, descricao_tipo in rows
        ]