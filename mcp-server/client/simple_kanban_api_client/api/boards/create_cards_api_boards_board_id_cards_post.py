from http import HTTPStatus
from typing import Any, Optional, Union

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.card_in_create import CardInCreate
from ...models.card_out import CardOut
from ...models.http_validation_error import HTTPValidationError
from ...types import Response


def _get_kwargs(
    board_id: int,
    *,
    body: list["CardInCreate"],
) -> dict[str, Any]:
    headers: dict[str, Any] = {}

    _kwargs: dict[str, Any] = {
        "method": "post",
        "url": f"/api/boards/{board_id}/cards",
    }

    _body = []
    for body_item_data in body:
        body_item = body_item_data.to_dict()
        _body.append(body_item)

    _kwargs["json"] = _body
    headers["Content-Type"] = "application/json"

    _kwargs["headers"] = headers
    return _kwargs


def _parse_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Optional[Union[HTTPValidationError, list["CardOut"]]]:
    if response.status_code == 201:
        response_201 = []
        _response_201 = response.json()
        for response_201_item_data in _response_201:
            response_201_item = CardOut.from_dict(response_201_item_data)

            response_201.append(response_201_item)

        return response_201
    if response.status_code == 422:
        response_422 = HTTPValidationError.from_dict(response.json())

        return response_422
    if client.raise_on_unexpected_status:
        raise errors.UnexpectedStatus(response.status_code, response.content)
    else:
        return None


def _build_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Response[Union[HTTPValidationError, list["CardOut"]]]:
    return Response(
        status_code=HTTPStatus(response.status_code),
        content=response.content,
        headers=response.headers,
        parsed=_parse_response(client=client, response=response),
    )


def sync_detailed(
    board_id: int,
    *,
    client: AuthenticatedClient,
    body: list["CardInCreate"],
) -> Response[Union[HTTPValidationError, list["CardOut"]]]:
    """Create Cards

    Args:
        board_id (int):
        body (list['CardInCreate']):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[HTTPValidationError, list['CardOut']]]
    """

    kwargs = _get_kwargs(
        board_id=board_id,
        body=body,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    board_id: int,
    *,
    client: AuthenticatedClient,
    body: list["CardInCreate"],
) -> Optional[Union[HTTPValidationError, list["CardOut"]]]:
    """Create Cards

    Args:
        board_id (int):
        body (list['CardInCreate']):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[HTTPValidationError, list['CardOut']]
    """

    return sync_detailed(
        board_id=board_id,
        client=client,
        body=body,
    ).parsed


async def asyncio_detailed(
    board_id: int,
    *,
    client: AuthenticatedClient,
    body: list["CardInCreate"],
) -> Response[Union[HTTPValidationError, list["CardOut"]]]:
    """Create Cards

    Args:
        board_id (int):
        body (list['CardInCreate']):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[HTTPValidationError, list['CardOut']]]
    """

    kwargs = _get_kwargs(
        board_id=board_id,
        body=body,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    board_id: int,
    *,
    client: AuthenticatedClient,
    body: list["CardInCreate"],
) -> Optional[Union[HTTPValidationError, list["CardOut"]]]:
    """Create Cards

    Args:
        board_id (int):
        body (list['CardInCreate']):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[HTTPValidationError, list['CardOut']]
    """

    return (
        await asyncio_detailed(
            board_id=board_id,
            client=client,
            body=body,
        )
    ).parsed
