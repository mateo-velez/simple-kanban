from contextlib import asynccontextmanager
from fastapi import FastAPI
from kanban_api import __version__
from kanban_api.config import settings
from kanban_api.database import engine, Base
from kanban_api.models import *
from kanban_api.routes import user, auth, board, card


@asynccontextmanager
async def lifespan(app: FastAPI):
    # before the app starts

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


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Welcome to Simple Kanban API. Go to /docs for documentation."}


app.include_router(user.router)
app.include_router(auth.router)
app.include_router(board.router)
app.include_router(card.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
