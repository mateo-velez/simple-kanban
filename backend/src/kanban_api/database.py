from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from kanban_api.config import settings


engine = create_async_engine(settings.db_url, connect_args={}, echo=settings.db_echo)  # type: ignore

SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass