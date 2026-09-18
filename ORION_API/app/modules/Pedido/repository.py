from sqlalchemy import select
from sqlalchemy.orm import aliased

from app.modules.Dominio.models import Dominio
from app.modules.Pedido.models import Pedido
from app.modules.Pedido.schemas import PedidoCreate, PedidoResponse, PedidoUpdate
from app.utils.repository import BaseRepository

DominioFormaPagamento = aliased(Dominio)
DominioStatus = aliased(Dominio)


class PedidoRepository(BaseRepository[Pedido, PedidoCreate, PedidoUpdate]):
    async def buscar(self, id: int) -> PedidoResponse | None:
        stmt = (
            select(Pedido, DominioFormaPagamento.Descricao, DominioStatus.Descricao)
            .join(DominioFormaPagamento, Pedido.DominioFormaPagamento_id == DominioFormaPagamento.Id)
            .join(DominioStatus, Pedido.DominioStatus_id == DominioStatus.Id)
            .where(Pedido.Id == id)
        )
        result = await self.db.execute(stmt)
        row = result.first()

        if not row:
            return None

        pedido_obj, descricao_forma_pagamento, descricao_status = row.tuple()

        return PedidoResponse(
            Usuario_id=pedido_obj.Usuario_id,
            Status=descricao_status,
            FormaPagamento=descricao_forma_pagamento,
            NomeCompleto=pedido_obj.NomeCompleto,
            CPF=pedido_obj.CPF,
            CEP=pedido_obj.CEP,
            Logradouro=pedido_obj.Logradouro,
            Numero=pedido_obj.Numero,
            Complemento=pedido_obj.Complemento,
            Bairro=pedido_obj.Bairro,
            Cidade=pedido_obj.Cidade,
            Estado=pedido_obj.Estado,
            Subtotal=pedido_obj.Subtotal,
            Desconto=pedido_obj.Desconto,
            Frete=pedido_obj.Frete,
            Total=pedido_obj.Total,
        )

    async def buscar_todos(self, limit: int = 100) -> list[PedidoResponse]:
        stmt = (
            select(Pedido, DominioFormaPagamento.Descricao, DominioStatus.Descricao)
            .join(DominioFormaPagamento, Pedido.DominioFormaPagamento_id == DominioFormaPagamento.Id)
            .join(DominioStatus, Pedido.DominioStatus_id == DominioStatus.Id)
            .limit(limit)
        )

        result = await self.db.execute(stmt)
        rows: list[tuple[Pedido, str, str]] = result.tuples().all()

        return [
            PedidoResponse(
                Usuario_id=pedido_obj.Usuario_id,
                Status=descricao_status,
                FormaPagamento=descricao_forma_pagamento,
                NomeCompleto=pedido_obj.NomeCompleto,
                CPF=pedido_obj.CPF,
                CEP=pedido_obj.CEP,
                Logradouro=pedido_obj.Logradouro,
                Numero=pedido_obj.Numero,
                Complemento=pedido_obj.Complemento,
                Bairro=pedido_obj.Bairro,
                Cidade=pedido_obj.Cidade,
                Estado=pedido_obj.Estado,
                Subtotal=pedido_obj.Subtotal,
                Desconto=pedido_obj.Desconto,
                Frete=pedido_obj.Frete,
                Total=pedido_obj.Total,
            )
            for pedido_obj, descricao_forma_pagamento, descricao_status in rows
        ]
        
    async def buscar_por_usuario(self, usuario_id: int, limit: int = 100) -> list[PedidoResponse]:
        stmt = (
            select(Pedido, DominioFormaPagamento.Descricao, DominioStatus.Descricao)
            .join(DominioFormaPagamento, Pedido.DominioFormaPagamento_id == DominioFormaPagamento.Id)
            .join(DominioStatus, Pedido.DominioStatus_id == DominioStatus.Id)
            .where(Pedido.Usuario_id == usuario_id)
            .limit(limit)
        )

        result = await self.db.execute(stmt)
        rows: list[tuple[Pedido, str, str]] = result.tuples().all()

        return [
            PedidoResponse(
                Usuario_id=pedido_obj.Usuario_id,
                Status=descricao_status,
                FormaPagamento=descricao_forma_pagamento,
                NomeCompleto=pedido_obj.NomeCompleto,
                CPF=pedido_obj.CPF,
                CEP=pedido_obj.CEP,
                Logradouro=pedido_obj.Logradouro,
                Numero=pedido_obj.Numero,
                Complemento=pedido_obj.Complemento,
                Bairro=pedido_obj.Bairro,
                Cidade=pedido_obj.Cidade,
                Estado=pedido_obj.Estado,
                Subtotal=pedido_obj.Subtotal,
                Desconto=pedido_obj.Desconto,
                Frete=pedido_obj.Frete,
                Total=pedido_obj.Total,
            )
            for pedido_obj, descricao_forma_pagamento, descricao_status in rows
        ]