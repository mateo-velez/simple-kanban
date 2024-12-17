from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from kanban_api.schemas.board import BoardInCreate, BoardOut
from kanban_api.schemas.user import UserInCreate, UserOut
from kanban_api.dependencies import get_board, get_db, get_current_user, get_user
from kanban_api.models import Board, User, UserBoard

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", status_code=201)
def create_user(user_create: UserInCreate, db: Session = Depends(get_db)) -> UserOut:
    stmt = select(User).where(User.email == user_create.email)
    existing_user = db.execute(stmt).scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(**user_create.model_dump(exclude=['password']))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/me", status_code=200)
def get_me(user: User = Depends(get_current_user)) -> UserOut:
    return user



@router.put("/{user_id}/boards/{board_id}", status_code=200)
def share_board(
    user: User = Depends(get_user),
    board: Board = Depends(get_board),
    db: Session = Depends(get_db)
):
    stmt = select(UserBoard).where(
        UserBoard.user_id == user.id,
        UserBoard.board_id == board.id
    )
    user_board = db.execute(stmt).scalar_one_or_none()
    
    if not user_board:
        db.add(UserBoard(user_id=user.id, board_id=board.id))
        db.commit()

@router.delete("/{user_id}/boards/{board_id}", status_code=204)
def unshare_board(
    user: User = Depends(get_user),
    board: Board = Depends(get_board),
    db: Session = Depends(get_db)
):
    stmt = select(UserBoard).where(
        UserBoard.user_id == user.id,
        UserBoard.board_id == board.id
    )
    user_board = db.execute(stmt).scalar_one_or_none()
    
    if user_board:
        db.delete(user_board)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="User board association not found")
