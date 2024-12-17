from fastapi import APIRouter, Depends, HTTPException
from kanban_api.schemas.card import CardInCreate, CardOut
from kanban_api.schemas.label import LabelInCreate, LabelOut
from sqlalchemy import select
from sqlalchemy.orm import Session

from kanban_api.schemas.board import BoardInCreate, BoardInUpdate, BoardOut
from kanban_api.dependencies import get_current_user, get_db, get_board
from kanban_api.models import Board, Card, Label, User

router = APIRouter(prefix="/boards", tags=["boards"], dependencies=[Depends(get_current_user)])

@router.get("", status_code=200)
def list_boards(
    current_user: User = Depends(get_current_user)
) -> list[BoardOut]:
    return current_user.boards

@router.post("", status_code=201)
def create_board(
    board_create: BoardInCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> BoardOut:
    board = Board(**board_create.model_dump(), owners=[current_user])
    db.add(board)
    db.commit()
    db.refresh(board)
    return board

@router.get("/{board_id}", status_code=200)
def get_board(
    board: Board = Depends(get_board),
) -> BoardOut:
    return board

@router.delete("/{board_id}", status_code=204)
def delete_board(
    board: Board = Depends(get_board),
    db: Session = Depends(get_db)
):
    db.delete(board)
    db.commit()

@router.patch("/{board_id}", status_code=200)
def update_board(
    board_update: BoardInUpdate,
    board: Board = Depends(get_board),
    db : Session = Depends(get_db)
) -> BoardOut:
    for field, value in board_update.model_dump(exclude_unset=True).items():
        setattr(board, field, value)

    db.commit()
    db.refresh(board)
    return board


@router.post("/{board_id}/cards", status_code=201)
def create_card(
    board_id: int,
    card_create: CardInCreate,
    board = Depends(get_board),
    db: Session = Depends(get_db)
) -> CardOut:
    card = Card(**card_create.model_dump(), board_id=board_id)
    db.add(card)
    db.commit()
    db.refresh(card)
    return card


@router.get("/{board_id}/cards", status_code=200)
def list_cards(
    board = Depends(get_board),
) -> list[CardOut]:
    return board.cards


@router.get("/{board_id}/labels", status_code=200)
def list_labels(
    board = Depends(get_board),
) -> list[LabelOut]:
    return board.labels


@router.put("/{board_id}/labels/{color}", status_code=200)
def create_or_update_label(
    board_id: int,
    color: str,
    label_create: LabelInCreate,
    board = Depends(get_board),
    db: Session = Depends(get_db)
) -> LabelOut:
    stmt = select(Label).where(Label.board_id == board_id, Label.color == color)
    label = db.execute(stmt).scalar_one_or_none()
    
    if label:
        for field, value in label_create.model_dump().items():
            setattr(label, field, value)
    else:
        label = Label(**label_create.model_dump(), board_id=board_id, color=color)
        db.add(label)
    
    db.commit()
    db.refresh(label)
    return label


@router.delete("/{board_id}/labels/{color}", status_code=204)
def delete_label(
    board_id: int,
    color: str,
    db: Session = Depends(get_db)
):
    stmt = select(Label).where(Label.board_id == board_id, Label.color == color)
    label = db.execute(stmt).scalar_one_or_none()
    
    if label:
        db.delete(label)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Label not found")