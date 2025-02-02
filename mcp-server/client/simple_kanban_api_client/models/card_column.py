from enum import Enum


class CardColumn(str, Enum):
    BACKLOG = "BACKLOG"
    DOING = "DOING"
    DONE = "DONE"
    TODO = "TODO"

    def __str__(self) -> str:
        return str(self.value)
