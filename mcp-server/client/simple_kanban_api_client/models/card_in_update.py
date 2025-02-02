from typing import Any, TypeVar, Union, cast

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from ..models.card_column import CardColumn
from ..models.label_color import LabelColor
from ..types import UNSET, Unset

T = TypeVar("T", bound="CardInUpdate")


@_attrs_define
class CardInUpdate:
    """
    Attributes:
        title (Union[None, Unset, str]):
        description (Union[None, Unset, str]):
        column (Union[CardColumn, None, Unset]):
        labels (Union[None, Unset, list[LabelColor]]):
    """

    title: Union[None, Unset, str] = UNSET
    description: Union[None, Unset, str] = UNSET
    column: Union[CardColumn, None, Unset] = UNSET
    labels: Union[None, Unset, list[LabelColor]] = UNSET
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        title: Union[None, Unset, str]
        if isinstance(self.title, Unset):
            title = UNSET
        else:
            title = self.title

        description: Union[None, Unset, str]
        if isinstance(self.description, Unset):
            description = UNSET
        else:
            description = self.description

        column: Union[None, Unset, str]
        if isinstance(self.column, Unset):
            column = UNSET
        elif isinstance(self.column, CardColumn):
            column = self.column.value
        else:
            column = self.column

        labels: Union[None, Unset, list[str]]
        if isinstance(self.labels, Unset):
            labels = UNSET
        elif isinstance(self.labels, list):
            labels = []
            for labels_type_0_item_data in self.labels:
                labels_type_0_item = labels_type_0_item_data.value
                labels.append(labels_type_0_item)

        else:
            labels = self.labels

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update({})
        if title is not UNSET:
            field_dict["title"] = title
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

        def _parse_title(data: object) -> Union[None, Unset, str]:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            return cast(Union[None, Unset, str], data)

        title = _parse_title(d.pop("title", UNSET))

        def _parse_description(data: object) -> Union[None, Unset, str]:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            return cast(Union[None, Unset, str], data)

        description = _parse_description(d.pop("description", UNSET))

        def _parse_column(data: object) -> Union[CardColumn, None, Unset]:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            try:
                if not isinstance(data, str):
                    raise TypeError()
                column_type_0 = CardColumn(data)

                return column_type_0
            except:  # noqa: E722
                pass
            return cast(Union[CardColumn, None, Unset], data)

        column = _parse_column(d.pop("column", UNSET))

        def _parse_labels(data: object) -> Union[None, Unset, list[LabelColor]]:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            try:
                if not isinstance(data, list):
                    raise TypeError()
                labels_type_0 = []
                _labels_type_0 = data
                for labels_type_0_item_data in _labels_type_0:
                    labels_type_0_item = LabelColor(labels_type_0_item_data)

                    labels_type_0.append(labels_type_0_item)

                return labels_type_0
            except:  # noqa: E722
                pass
            return cast(Union[None, Unset, list[LabelColor]], data)

        labels = _parse_labels(d.pop("labels", UNSET))

        card_in_update = cls(
            title=title,
            description=description,
            column=column,
            labels=labels,
        )

        card_in_update.additional_properties = d
        return card_in_update

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
