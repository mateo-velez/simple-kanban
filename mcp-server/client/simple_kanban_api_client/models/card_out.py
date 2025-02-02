import datetime
from typing import Any, TypeVar

from attrs import define as _attrs_define
from attrs import field as _attrs_field
from dateutil.parser import isoparse

from ..models.card_column import CardColumn
from ..models.label_color import LabelColor

T = TypeVar("T", bound="CardOut")


@_attrs_define
class CardOut:
    """
    Attributes:
        id (int):
        title (str):
        description (str):
        board_id (int):
        column (CardColumn):
        labels (list[LabelColor]):
        created_at (datetime.datetime):
        updated_at (datetime.datetime):
    """

    id: int
    title: str
    description: str
    board_id: int
    column: CardColumn
    labels: list[LabelColor]
    created_at: datetime.datetime
    updated_at: datetime.datetime
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        id = self.id

        title = self.title

        description = self.description

        board_id = self.board_id

        column = self.column.value

        labels = []
        for labels_item_data in self.labels:
            labels_item = labels_item_data.value
            labels.append(labels_item)

        created_at = self.created_at.isoformat()

        updated_at = self.updated_at.isoformat()

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "id": id,
                "title": title,
                "description": description,
                "boardId": board_id,
                "column": column,
                "labels": labels,
                "createdAt": created_at,
                "updatedAt": updated_at,
            }
        )

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: dict[str, Any]) -> T:
        d = src_dict.copy()
        id = d.pop("id")

        title = d.pop("title")

        description = d.pop("description")

        board_id = d.pop("boardId")

        column = CardColumn(d.pop("column"))

        labels = []
        _labels = d.pop("labels")
        for labels_item_data in _labels:
            labels_item = LabelColor(labels_item_data)

            labels.append(labels_item)

        created_at = isoparse(d.pop("createdAt"))

        updated_at = isoparse(d.pop("updatedAt"))

        card_out = cls(
            id=id,
            title=title,
            description=description,
            board_id=board_id,
            column=column,
            labels=labels,
            created_at=created_at,
            updated_at=updated_at,
        )

        card_out.additional_properties = d
        return card_out

    @property
    def additional_keys(self) -> list[str]:
        return list(self.additional_properties.keys())

    def __getitem__(self, key: str) -> Any:
        return self.additional_properties[key]

    def __setitem__(self, key: str, value: Any) -> None:
        self.additional_properties[key] = value

    def __delitem__(self, key: str) -> None:
        del self.additional_properties[key]

    def __contains__(self, key: str) -> bool:
        return key in self.additional_properties
