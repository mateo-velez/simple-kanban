from datetime import datetime
from typing import Optional
from kanban_api.schemas.base import BaseSchema


# Input models
class LabelInCreate(BaseSchema):
    color: str  # Hex color code
    name: str


class LabelInUpdate(BaseSchema):
    name: Optional[str] = None


# Output models
class LabelOut(BaseSchema):
    id: int
    color: str
    name: str
    board_id: int
    created_at: datetime
    updated_at: datetime 