from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from kanban_api.dependencies import get_board, get_current_user, get_db, get_user
from kanban_api.models import Board, User, UserBoard
from kanban_api.schemas.board import BoardInCreate, BoardOut
from kanban_api.schemas.user import UserInCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", status_code=201)
def create_user(user_create: UserInCreate, db: Session = Depends(get_db)) -> UserOut:
    stmt = select(User).where(User.email == user_create.email)
    existing_user = db.execute(stmt).scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(**user_create.model_dump(exclude=["password"]))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/me", status_code=200)
def get_me(user: User = Depends(get_current_user)) -> UserOut:
    return user
