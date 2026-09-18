from app.modules.PedidoItem.models import PedidoItem
from app.modules.PedidoItem.schemas import (
    PedidoItemCreate,
    PedidoItemUpdate,
)
from app.utils.repository import BaseRepository


class PedidoItemRepository(BaseRepository[PedidoItem, PedidoItemCreate, PedidoItemUpdate]):
    pass
