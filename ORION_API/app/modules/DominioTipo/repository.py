from app.modules.DominioTipo.models import DominioTipo
from app.modules.DominioTipo.schemas import DominioTipoCreate, DominioTipoUpdate
from app.utils.repository import BaseRepository


class DominioTipoRepository(BaseRepository[DominioTipo, DominioTipoCreate, DominioTipoUpdate]):
    pass