from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


from datetime import datetime, timedelta, timezone
import os
import jwt
from kanban_api.schemas.token import TokenData
from kanban_api.config import settings


def create_access_token(data: TokenData, expires_delta: timedelta | None = None) -> str:
    to_encode = data.model_dump(exclude_unset=True,exclude_none=True)
    if expires_delta:
        to_encode.update({"exp": datetime.now(timezone.utc) + expires_delta})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def decode_access_token(token: str) -> TokenData | None:
    decoded = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])  # type: ignore
    if decoded.get("sub") is None:
        return None
    return TokenData(**decoded)
