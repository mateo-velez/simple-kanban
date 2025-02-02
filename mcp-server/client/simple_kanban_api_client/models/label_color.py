from enum import Enum


class LabelColor(str, Enum):
    BLUE = "blue"
    GRAY = "gray"
    GREEN = "green"
    ORANGE = "orange"
    PURPLE = "purple"
    RED = "red"
    YELLOW = "yellow"

    def __str__(self) -> str:
        return str(self.value)
