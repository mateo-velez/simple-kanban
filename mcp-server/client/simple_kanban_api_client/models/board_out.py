import datetime
from typing import TYPE_CHECKING, Any, TypeVar

from attrs import define as _attrs_define
from attrs import field as _attrs_field
from dateutil.parser import isoparse

if TYPE_CHECKING:
    from ..models.label_out import LabelOut


T = TypeVar("T", bound="BoardOut")


@_attrs_define
class BoardOut:
    """
    Attributes:
        id (int):
        title (str):
        labels (list['LabelOut']):
        description (str):
        created_at (datetime.datetime):
        updated_at (datetime.datetime):
    """

    id: int
    title: str
    labels: list["LabelOut"]
    description: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        id = self.id

        title = self.title

        labels = []
        for labels_item_data in self.labels:
            labels_item = labels_item_data.to_dict()
            labels.append(labels_item)

        description = self.description

        created_at = self.created_at.isoformat()

        updated_at = self.updated_at.isoformat()

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "id": id,
                "title": title,
                "labels": labels,
                "description": description,
                "createdAt": created_at,
                "updatedAt": updated_at,
            }
        )

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: dict[str, Any]) -> T:
        from ..models.label_out import LabelOut

        d = src_dict.copy()
        id = d.pop("id")

        title = d.pop("title")

        labels = []
        _labels = d.pop("labels")
        for labels_item_data in _labels:
            labels_item = LabelOut.from_dict(labels_item_data)

            labels.append(labels_item)

        description = d.pop("description")

        created_at = isoparse(d.pop("createdAt"))

        updated_at = isoparse(d.pop("updatedAt"))

        board_out = cls(
            id=id,
            title=title,
            labels=labels,
            description=description,
            created_at=created_at,
            updated_at=updated_at,
        )

        board_out.additional_properties = d
        return board_out

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
