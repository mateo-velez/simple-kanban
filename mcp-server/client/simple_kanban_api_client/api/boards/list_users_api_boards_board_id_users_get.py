from http import HTTPStatus
from typing import Any, Optional, Union

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.http_validation_error import HTTPValidationError
from ...models.user_out_public import UserOutPublic
from ...types import Response


def _get_kwargs(
    board_id: int,
) -> dict[str, Any]:
    _kwargs: dict[str, Any] = {
        "method": "get",
        "url": f"/api/boards/{board_id}/users",
    }

    return _kwargs


def _parse_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Optional[Union[HTTPValidationError, list["UserOutPublic"]]]:
    if response.status_code == 200:
        response_200 = []
        _response_200 = response.json()
        for response_200_item_data in _response_200:
            response_200_item = UserOutPublic.from_dict(response_200_item_data)

            response_200.append(response_200_item)

        return response_200
    if response.status_code == 422:
        response_422 = HTTPValidationError.from_dict(response.json())

        return response_422
    if client.raise_on_unexpected_status:
        raise errors.UnexpectedStatus(response.status_code, response.content)
    else:
        return None


def _build_response(
    *, client: Union[AuthenticatedClient, Client], response: httpx.Response
) -> Response[Union[HTTPValidationError, list["UserOutPublic"]]]:
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
) -> Response[Union[HTTPValidationError, list["UserOutPublic"]]]:
    """List Users

    Args:
        board_id (int):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[HTTPValidationError, list['UserOutPublic']]]
    """

    kwargs = _get_kwargs(
        board_id=board_id,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    board_id: int,
    *,
    client: AuthenticatedClient,
) -> Optional[Union[HTTPValidationError, list["UserOutPublic"]]]:
    """List Users

    Args:
        board_id (int):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[HTTPValidationError, list['UserOutPublic']]
    """

    return sync_detailed(
        board_id=board_id,
        client=client,
    ).parsed


async def asyncio_detailed(
    board_id: int,
    *,
    client: AuthenticatedClient,
) -> Response[Union[HTTPValidationError, list["UserOutPublic"]]]:
    """List Users

    Args:
        board_id (int):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[Union[HTTPValidationError, list['UserOutPublic']]]
    """

    kwargs = _get_kwargs(
        board_id=board_id,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    board_id: int,
    *,
    client: AuthenticatedClient,
) -> Optional[Union[HTTPValidationError, list["UserOutPublic"]]]:
    """List Users

    Args:
        board_id (int):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Union[HTTPValidationError, list['UserOutPublic']]
    """

    return (
        await asyncio_detailed(
            board_id=board_id,
            client=client,
        )
    ).parsed
