import asyncio
import json
import os
import time
from typing import Any, Callable, Coroutine, TypeVar

from mcp.server.fastmcp import FastMCP
from simple_kanban_api_client import AuthenticatedClient, Client
from simple_kanban_api_client.api.auth import login_api_auth_tokens_post
from simple_kanban_api_client.api.boards import (
    create_board_api_boards_post,
    create_cards_api_boards_board_id_cards_post,
    delete_board_api_boards_board_id_delete,
    get_board_api_boards_board_id_get,
    list_boards_api_boards_get,
    list_cards_api_boards_board_id_cards_get,
    update_board_api_boards_board_id_patch,
)
from simple_kanban_api_client.api.cards import (
    delete_card_api_cards_card_id_delete,
    get_card_api_cards_card_id_get,
    update_card_api_cards_card_id_patch,
)
from simple_kanban_api_client.models import (
    BoardInCreate,
    BoardInUpdate,
    BoardOut,
    BodyLoginApiAuthTokensPost,
    CardColumn,
    CardInCreate,
    CardInUpdate,
    CardOut,
    HTTPValidationError,
    LabelColor,
    Token,
)

from mcp_server.config import config
from mcp_server.schemas import BoardCreate, BoardUpdate, CardCreate, CardUpdate

T = TypeVar("T")


async def call(
    callable: Callable[..., Coroutine[Any, Any, T | HTTPValidationError | None]],
    **kwargs: Any,
) -> T:
    response = await callable(**kwargs)

    if response is None:
        raise ValueError(f"Failed to call {callable.__name__}")

    if isinstance(response, HTTPValidationError):
        raise ValueError(response.detail)

    return response


async def get_authenticated_client():
    """
    Returns an AuthenticatedClient instance with a valid access token.
    """
    # Check if token file is missing or token is older than 1 hour (3600 seconds)
    if not os.path.exists(config.token_path) or (
        time.time() - os.path.getmtime(config.token_path) > 3600
    ):
        async with Client(base_url=config.api_base_url) as client:
            response: Token = await call(
                login_api_auth_tokens_post.asyncio,
                body=BodyLoginApiAuthTokensPost(
                    grant_type="password",
                    username=config.kanban_username,
                    password=config.kanban_password,
                ),
                client=client,
            )

            token_data = response.to_dict()

            with open(config.token_path, "w") as token_file:
                json.dump(token_data, token_file)

    else:
        with open(config.token_path, "r") as token_file:
            token_data = json.load(token_file)

    return AuthenticatedClient(
        base_url=config.api_base_url, token=token_data["access_token"]
    )


mcp = FastMCP()


@mcp.tool()
async def list_boards():
    """Get list of all boards."""
    client = await get_authenticated_client()
    response: list[BoardOut] = await call(
        list_boards_api_boards_get.asyncio, client=client
    )

    return [
        {
            "id": board.id,
            "name": board.title,
            "created_at": board.created_at,
            "updated_at": board.updated_at,
        }
        for board in response
    ]


@mcp.tool()
async def get_board(board_id: int, include_cards: bool = True):
    """Get a board and its cards by ID."""
    client = await get_authenticated_client()

    if include_cards:
        board_response, cards_response = await asyncio.gather(
            call(
                get_board_api_boards_board_id_get.asyncio,
                board_id=board_id,
                client=client,
            ),
            call(
                list_cards_api_boards_board_id_cards_get.asyncio,
                board_id=board_id,
                client=client,
            ),
        )

        return {
            "board": board_response.to_dict(),
            "cards": [
                {
                    "id": card.id,
                    "name": card.title,
                    "label": card.labels,
                    "created_at": card.created_at,
                    "updated_at": card.updated_at,
                }
                for card in cards_response
            ],
        }
    else:
        board_response: BoardOut = await call(
            get_board_api_boards_board_id_get.asyncio,
            board_id=board_id,
            client=client,
        )
        return board_response.to_dict()


@mcp.tool()
async def create_board(board_in: BoardCreate):
    """Create a new board."""
    client = await get_authenticated_client()
    response: BoardOut = await call(
        create_board_api_boards_post.asyncio,
        body=BoardInCreate(title=board_in.title, description=board_in.description),
        client=client,
    )

    return {"id": response.id}


@mcp.tool()
async def update_board(board_id: int, board_in: BoardUpdate):
    """Update a board by its ID."""
    client = await get_authenticated_client()
    response: BoardOut = await call(
        update_board_api_boards_board_id_patch.asyncio,
        board_id=board_id,
        body=BoardInUpdate(title=board_in.title, description=board_in.description),
        client=client,
    )

    return {
        "id": response.id,
        "created_at": response.created_at,
        "updated_at": response.updated_at,
    }


@mcp.tool()
async def delete_board(board_id: int):
    """Delete a board by its ID."""
    client = await get_authenticated_client()
    await call(
        delete_board_api_boards_board_id_delete.asyncio,
        board_id=board_id,
        client=client,
    )


@mcp.tool()
async def list_board_cards(board_id: int):
    """List all cards in a board."""
    client = await get_authenticated_client()
    response: list[CardOut] = await call(
        list_cards_api_boards_board_id_cards_get.asyncio,
        board_id=board_id,
        client=client,
    )

    return [card.to_dict() for card in response]


@mcp.tool()
async def create_cards(board_id: int, cards_in: list[CardCreate]):
    """Create new cards in a board."""
    client = await get_authenticated_client()
    response: list[CardOut] = await call(
        create_cards_api_boards_board_id_cards_post.asyncio,
        board_id=board_id,
        body=[
            CardInCreate(
                title=card.title,
                description=card.description,
                column=CardColumn(card.column),
                labels=[LabelColor(label) for label in card.labels],
            )
            for card in cards_in
        ],
        client=client,
    )

    return [
        {
            "id": card.id,
            "created_at": card.created_at,
            "updated_at": card.updated_at,
        }
        for card in response
    ]


@mcp.tool()
async def get_cards(card_ids: list[int]):
    """Get a set of cards by their IDs."""
    client = await get_authenticated_client()
    responses: list[CardOut] = await asyncio.gather(
        *(
            call(
                get_card_api_cards_card_id_get.asyncio,
                card_id=card_id,
                client=client,
            )
            for card_id in card_ids
        )
    )

    return [card.to_dict() for card in responses]


# TODO: Implement atomic updates
@mcp.tool()
async def update_card(card_id: int, card_in: CardUpdate):
    """Update a card by its ID."""
    client = await get_authenticated_client()

    response: CardOut = await call(
        update_card_api_cards_card_id_patch.asyncio,
        card_id=card_id,
        body=CardInUpdate(**card_in.model_dump(exclude_unset=True)),
        client=client,
    )

    return {
        "id": response.id,
        "created_at": response.created_at,
        "updated_at": response.updated_at,
    }


@mcp.tool()
async def delete_cards(card_ids: list[int]):
    """Delete a set of cards by their IDs."""
    client = await get_authenticated_client()
    await asyncio.gather(
        *(
            call(
                delete_card_api_cards_card_id_delete.asyncio,
                card_id=card_id,
                client=client,
            )
            for card_id in card_ids
        )
    )


if __name__ == "__main__":
    mcp.run()
