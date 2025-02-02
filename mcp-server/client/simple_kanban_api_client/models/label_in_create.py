from typing import Any, TypeVar, Union

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from ..models.label_color import LabelColor
from ..types import UNSET, Unset

T = TypeVar("T", bound="LabelInCreate")


@_attrs_define
class LabelInCreate:
    """
    Attributes:
        color (LabelColor):
        name (Union[Unset, str]):  Default: ''.
    """

    color: LabelColor
    name: Union[Unset, str] = ""
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        color = self.color.value

        name = self.name

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "color": color,
            }
        )
        if name is not UNSET:
            field_dict["name"] = name

        return field_dict

    @classmethod
    def from_dict(cls: type[T], src_dict: dict[str, Any]) -> T:
        d = src_dict.copy()
        color = LabelColor(d.pop("color"))

        name = d.pop("name", UNSET)

        label_in_create = cls(
            color=color,
            name=name,
        )

        label_in_create.additional_properties = d
        return label_in_create

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
