from app.modules.Usuario.models import Usuario
from app.modules.Usuario.schemas import (
    UsuarioCreate,
    UsuarioUpdate,
)
from app.utils.repository import BaseRepository


class UsuarioRepository(BaseRepository[Usuario, UsuarioCreate, UsuarioUpdate]):
    pass