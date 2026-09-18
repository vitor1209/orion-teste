from functools import lru_cache

from fastapi.middleware.cors import CORSMiddleware


@lru_cache
def get_cors_origins():
    return ["*"]


def is_allowed_origin(origin: str | None) -> bool:
    return bool(origin) and origin in get_cors_origins()


def setup_cors(app):
    origins = get_cors_origins()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
