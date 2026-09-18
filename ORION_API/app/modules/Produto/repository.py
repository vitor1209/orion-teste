from app.modules.Produto.models import Produto
from app.modules.Produto.schemas import ProdutoCreate, ProdutoUpdate
from app.utils.repository import BaseRepository


class ProdutoRepository(BaseRepository[Produto, ProdutoCreate, ProdutoUpdate]):
    pass