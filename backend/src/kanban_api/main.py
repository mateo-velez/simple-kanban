from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import kanban_api.models
from kanban_api import __version__
from kanban_api.config import settings
from kanban_api.database import Base, engine
from kanban_api.routes import auth, board, card, user


@asynccontextmanager
async def lifespan(app: FastAPI):

    if settings.drop_all:
        Base.metadata.drop_all(bind=engine)

    Base.metadata.create_all(bind=engine)

    yield
    # after the app shuts down


app = FastAPI(
    title="Simple Kanban API",
    description="A simple kanban API",
    version=__version__,
    lifespan=lifespan,
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")

api.include_router(auth.router)
api.include_router(user.router)
api.include_router(board.router)
api.include_router(card.router)

app.include_router(api)

app.mount("/", StaticFiles(directory=settings.static_files_dir, html=True), name="static")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
