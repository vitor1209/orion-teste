import os

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL_PADRAO = "sqlite+aiosqlite:///./orion_local.db"


def _env(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def _normalizar_url(url: str) -> str:
    """Garante um driver assincrono na URL, aceitando as formas sincronas usuais."""
    if url.startswith("mysql+pymysql://"):
        return url.replace("mysql+pymysql://", "mysql+aiomysql://", 1)
    if url.startswith("mysql://"):
        return url.replace("mysql://", "mysql+aiomysql://", 1)
    if url.startswith("sqlite://") and not url.startswith("sqlite+aiosqlite://"):
        return url.replace("sqlite://", "sqlite+aiosqlite://", 1)
    return url


def _connect_args(url: str) -> dict:
    """connect_args depende do dialeto: init_command so existe no MySQL."""
    if url.startswith("mysql"):
        return {"init_command": "SET time_zone = '-03:00'"}
    if url.startswith("sqlite"):
        return {"check_same_thread": False}
    return {}


database_url = _normalizar_url(_env("DATABASE_URL") or DATABASE_URL_PADRAO)

engine = create_async_engine(
    database_url,
    echo=False,
    future=True,
    connect_args=_connect_args(database_url),
)
SessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, autoflush=False, expire_on_commit=False
)
Base = declarative_base()


# Função de dependência: abre uma sessão por requisição e garante o fechamento
async def get_db():
    async with SessionLocal() as db:
        yield db


from app.modules.Atividade.models import Atividade  # noqa: F401
from app.modules.Dominio.models import Dominio  # noqa: F401
from app.modules.DominioTipo.models import DominioTipo  # noqa: F401
from app.modules.Pedido.models import Pedido  # noqa: F401
from app.modules.PedidoItem.models import PedidoItem  # noqa: F401
from app.modules.Produto.models import Produto  # noqa: F401
from app.modules.RegistroAtividade.models import RegistroAtividade  # noqa: F401
from app.modules.Usuario.models import Usuario  # noqa: F401
