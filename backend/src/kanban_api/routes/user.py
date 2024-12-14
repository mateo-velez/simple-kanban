from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from kanban_api.schemas.user import UserInCreate, UserOut
from kanban_api.dependencies import get_db
from kanban_api.models import User

router = APIRouter(prefix="/users", tags=["users"])

@router.post("", status_code=201)
def create_user(user_create: UserInCreate, db: Session = Depends(get_db)) -> UserOut:
    existing_user = db.execute(select(User).where(User.email == user_create.email)).scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(**user_create.model_dump(exclude=['password']))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
