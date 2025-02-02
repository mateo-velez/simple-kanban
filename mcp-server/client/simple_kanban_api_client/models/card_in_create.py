from typing import Any, TypeVar, Union

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from ..models.card_column import CardColumn
from ..models.label_color import LabelColor
from ..types import UNSET, Unset

T = TypeVar("T", bound="CardInCreate")


@_attrs_define
class CardInCreate:
    """
    Attributes:
        title (str):
        description (Union[Unset, str]):  Default: ''.
        column (Union[Unset, CardColumn]):
        labels (Union[Unset, list[LabelColor]]):
    """

    title: str
    description: Union[Unset, str] = ""
    column: Union[Unset, CardColumn] = UNSET
    labels: Union[Unset, list[LabelColor]] = UNSET
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        title = self.title

        description = self.description

        column: Union[Unset, str] = UNSET
        if not isinstance(self.column, Unset):
            column = self.column.value

        labels: Union[Unset, list[str]] = UNSET
        if not isinstance(self.labels, Unset):
            labels = []
            for labels_item_data in self.labels:
                labels_item = labels_item_data.value
                labels.append(labels_item)

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "title": title,
            }
        )
        if description is not UNSET:
            field_dict["description"] = description
        if column is not UNSET:
            field_dict["column"] = column
        if labels is not UNSET:
            field_dict["labels"] = labels

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: dict[str, Any]) -> T:
        d = src_dict.copy()
        title = d.pop("title")

        description = d.pop("description", UNSET)

        _column = d.pop("column", UNSET)
        column: Union[Unset, CardColumn]
        if isinstance(_column, Unset):
            column = UNSET
        else:
            column = CardColumn(_column)

        labels = []
        _labels = d.pop("labels", UNSET)
        for labels_item_data in _labels or []:
            labels_item = LabelColor(labels_item_data)

            labels.append(labels_item)

        card_in_create = cls(
            title=title,
            description=description,
            column=column,
            labels=labels,
        )

        card_in_create.additional_properties = d
        return card_in_create

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
