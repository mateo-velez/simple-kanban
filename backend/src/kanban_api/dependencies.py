from kanban_api.database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from jwt.exceptions import InvalidTokenError

from kanban_api.models import User
from kanban_api.utils import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/tokens")



async def get_db():
    async_session = SessionLocal()
    try:
        yield async_session
    finally:
        await async_session.close()


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_data = decode_access_token(token)
        if token_data is None:
            raise credentials_exception
    except InvalidTokenError as e:
        raise credentials_exception
    user = await db.execute(select(User).where(User.id == int(token_data.sub)))
    user = user.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user  # type: ignore
