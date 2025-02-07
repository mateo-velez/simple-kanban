from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel


class BoardCreate(BaseModel):
    """Input schema for creating a board."""

    title: str
    description: str = ""


class BoardUpdate(BaseModel):
    """Input schema for updating a board."""

    title: Optional[str] = None
    description: Optional[str] = None


class CardCreate(BaseModel):
    """Input schema for creating a card."""

    title: str
    description: str = ""
    column: str = "BACKLOG"
    labels: List[str] = []


class CardUpdate(BaseModel):
    """Input schema for updating a card."""

    title: Optional[str] = None
    description: Optional[str] = None
    column: Optional[str] = None
    labels: Optional[List[str]] = None


class CardsCreate(BaseModel):
    """Input schema for creating multiple cards."""

    cards: List[CardCreate]


class CardResponse(BaseModel):
    """Schema for card response in board details."""

    id: int
    name: str
    label: str
    created_at: datetime
    updated_at: datetime


class BoardResponse(BaseModel):
    """Schema for board response with optional cards."""

    board: Dict[str, Any]
    cards: Optional[List[CardResponse]] = None
