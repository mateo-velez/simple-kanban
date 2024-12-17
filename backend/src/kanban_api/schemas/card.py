from datetime import datetime
from typing import Optional
from kanban_api.schemas.base import BaseSchema


# Input models
class CardInCreate(BaseSchema):
    title: str
    description: str = ""


class CardInUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None


# Output models
class CardOut(BaseSchema):
    id: int
    title: str
    description: Optional[str]
    board_id: int
    created_at: datetime
    updated_at: datetime 