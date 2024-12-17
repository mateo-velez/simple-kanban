from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from kanban_api.schemas.card import CardInCreate, CardInUpdate, CardOut
from kanban_api.dependencies import get_current_user, get_db, get_board, get_card
from kanban_api.models import Card, CardLabel, Label

router = APIRouter(prefix="/cards", tags=["cards"], dependencies=[Depends(get_current_user)])


@router.get("/{card_id}", status_code=200)
def get_card(
    card: Card = Depends(get_card),
) -> CardOut:
    return card


@router.patch("/{card_id}", status_code=200)
def update_card(
    card_update: CardInUpdate,
    card: Card = Depends(get_card),
    db: Session = Depends(get_db)
) -> CardOut:
    for field, value in card_update.model_dump(exclude_unset=True).items():
        setattr(card, field, value)
    
    db.commit()
    db.refresh(card)
    return card


@router.delete("/{card_id}", status_code=204)
def delete_card(
    card: Card = Depends(get_card),
    db: Session = Depends(get_db)
):
    db.delete(card)
    db.commit() 


@router.put("/{card_id}/labels/{color}", status_code=200)
def add_label_to_card(
    color: str,
    card: Card = Depends(get_card),
    db: Session = Depends(get_db)
):
    stmt = select(Label).where(Label.board_id == card.board_id, Label.color == color)
    label = db.execute(stmt).scalar_one_or_none()
    
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    
    stmt = select(CardLabel).where(
        CardLabel.card_id == card.id,
        CardLabel.label_id == label.id
    )
    card_label = db.execute(stmt).scalar_one_or_none()
    
    if not card_label:
        db.add(CardLabel(card_id=card.id, label_id=label.id))
        db.commit()


@router.delete("/{card_id}/labels/{color}", status_code=204)
def remove_label_from_card(
    color: str,
    card: Card = Depends(get_card),
    db: Session = Depends(get_db)
):
    stmt = select(Label).where(Label.board_id == card.board_id, Label.color == color)
    label = db.execute(stmt).scalar_one_or_none()
    
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    
    stmt = select(CardLabel).where(
        CardLabel.card_id == card.id,
        CardLabel.label_id == label.id
    )
    card_label = db.execute(stmt).scalar_one_or_none()
    
    if card_label:
        db.delete(card_label)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Card-label association not found") 