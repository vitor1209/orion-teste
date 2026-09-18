import os

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.v1.router import router as api_v1_router
from app.core.cors import setup_cors
from app.core.database import Base, SessionLocal, engine
from app.modules.Auth.router import router as auth_router
from app.modules.Usuario.router import router_publico as usuario_router_publico
from app.modules.vision.router import get_router as get_vision_video_router
from app.modules.vision.services.video_stream import VideoStreamService
from app.seed_offline import semear_dados_offline

app = FastAPI(
    title="ORION API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

setup_cors(app)
MODEL_PATH = os.getenv("ORION_MODEL_PATH", "app/modules/vision/Modelos/hand_landmarker.task")
SEED_OFFLINE = os.getenv("ORION_SEED_OFFLINE", "true").strip().lower() not in {"false", "0", "no"}


@app.on_event("startup")
async def on_startup() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    if SEED_OFFLINE:
        async with SessionLocal() as db:
            await semear_dados_offline(db)

def criar_video_stream_service(enviar_nota):
    return VideoStreamService(MODEL_PATH, enviar_nota)

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc)}
    )
    
app.include_router(auth_router)
app.include_router(usuario_router_publico)
app.include_router(api_v1_router)
app.include_router(get_vision_video_router(criar_video_stream_service), prefix="/api/v1")

@app.get("/")
async def root():
    return {"status": "ok", "service": "Orion API"}