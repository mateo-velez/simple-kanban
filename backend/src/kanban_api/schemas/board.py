from datetime import datetime
from typing import Optional
from kanban_api.schemas.base import BaseSchema


# Input models
class BoardInCreate(BaseSchema):
    title: str
    description: str = ""


class BoardInUpdate(BaseSchema):
    title: Optional[str] = None
    description: Optional[str] = None


# Output models
class BoardOut(BaseSchema):
    id: int
    title: str
    description: Optional[str]
    created_at: datetime
    updated_at: datetime 