from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from kanban_api.schemas.user import UserInCreate, UserOut
from kanban_api.dependencies import get_db, get_current_user
from kanban_api.models import User

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", status_code=201)
async def create_user(user_create: UserInCreate, db: AsyncSession = Depends(get_db)) -> UserOut:
    existing_user = await db.execute(select(User).where(User.email == user_create.email))
    existing_user = existing_user.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(**user_create.model_dump(exclude=['password']))
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user



@router.get("/me", status_code=200)
async def get_me(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)) -> UserOut:
    return user
