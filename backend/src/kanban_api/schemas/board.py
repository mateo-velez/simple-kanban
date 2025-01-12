from datetime import datetime
from kanban_api.schemas.base import BaseSchema
from kanban_api.schemas.label import LabelColor, LabelInCreate, LabelOut, LabelInUpdate
from pydantic import computed_field


# Input models
class BoardInCreate(BaseSchema):
    title: str
    description: str = ""

    @computed_field
    def labels(self) -> list[LabelInCreate]:
        return [LabelInCreate(color=color) for color in LabelColor]


class BoardInUpdate(BaseSchema):
    title: str | None = None
    description: str | None = None
    labels: list[LabelInUpdate] | None = None


# Output models
class BoardOut(BaseSchema):
    id: int
    title: str
    labels: list[LabelOut]
    description: str
    created_at: datetime
    updated_at: datetime
