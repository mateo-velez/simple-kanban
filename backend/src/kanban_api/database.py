from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from kanban_api.config import settings

engine = create_engine(settings.db_url, echo=settings.db_echo)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass