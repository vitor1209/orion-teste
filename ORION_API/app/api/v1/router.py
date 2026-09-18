from fastapi import APIRouter
from fastapi.params import Depends

from app.core.security import get_current_user
from app.modules.Atividade.router import router as Atividade_router
from app.modules.Dominio.router import router as dominio_router
from app.modules.DominioTipo.router import router as dominio_tipo_router
from app.modules.Pedido.router import router as Pedido_router
from app.modules.PedidoItem.router import router as pedido_item_router
from app.modules.Produto.router import router as produto_router
from app.modules.RegistroAtividade.router import router as registro_atividade_router
from app.modules.Usuario.router import (
    router as Usuario_router,
)
from app.modules.vision.router import router as vision_router

router = APIRouter(prefix="/api/v1")

protegido = [Depends(get_current_user)]


router.include_router(vision_router)
router.include_router(Atividade_router, dependencies=protegido)
router.include_router(registro_atividade_router, dependencies=protegido)
router.include_router(Usuario_router, dependencies=protegido)
router.include_router(produto_router, dependencies=protegido)
router.include_router(Pedido_router, dependencies=protegido)
router.include_router(pedido_item_router, dependencies=protegido)
router.include_router(dominio_router, dependencies=protegido)
router.include_router(dominio_tipo_router, dependencies=protegido)