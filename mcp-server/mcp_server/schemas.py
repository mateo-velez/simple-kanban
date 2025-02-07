from enum import Enum
from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel
from simple_kanban_api_client.models import LabelColor, CardColumn


class BoardCreate(BaseModel):
    """Input schema for creating a board."""

    title: str
    description: str = ""


class LabelUpdate(BaseModel):
    """Input schema for updating a label."""

    color: LabelColor
    name: Optional[str] = None


class BoardUpdate(BaseModel):
    """Input schema for updating a board."""

    title: Optional[str] = None
    description: Optional[str] = None
    labels: List[LabelUpdate] = []


class CardCreate(BaseModel):
    """Input schema for creating a card."""

    title: str
    description: str = ""
    column: CardColumn = CardColumn.BACKLOG
    labels: List[LabelColor] = []


class CardUpdate(BaseModel):
    """Input schema for updating a card."""

    title: Optional[str] = None
    description: Optional[str] = None
    column: Optional[CardColumn] = None
    labels: Optional[List[LabelColor]] = None


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
