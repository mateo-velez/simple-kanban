import os
import time
import json
from mcp_server.config import config
from mcp_server.schemas import (
    BoardCreate,
    BoardUpdate,
    CardCreate,
    CardUpdate,
    CardsCreate,
)
from simple_kanban_api_client import Client, AuthenticatedClient
from simple_kanban_api_client.types import Response, Unset
from simple_kanban_api_client.models import (
    Token,
    BoardOut,
    BoardInCreate,
    BoardInUpdate,
    CardOut,
    CardInCreate,
    CardInUpdate,
    UserOutPublic,
    CardColumn,
    LabelColor,
    HTTPValidationError,
    BodyLoginApiAuthTokensPost,
)
from simple_kanban_api_client.api.auth import login_api_auth_tokens_post
from simple_kanban_api_client.api.boards import (
    list_boards_api_boards_get,
    create_board_api_boards_post,
    get_board_api_boards_board_id_get,
    update_board_api_boards_board_id_patch,
    delete_board_api_boards_board_id_delete,
    list_cards_api_boards_board_id_cards_get,
    create_cards_api_boards_board_id_cards_post,
    list_users_api_boards_board_id_users_get,
    share_board_api_boards_board_id_users_user_id_put,
    unshare_board_api_boards_board_id_users_user_id_delete,
)
from simple_kanban_api_client.api.cards import (
    get_card_api_cards_card_id_get,
    update_card_api_cards_card_id_patch,
    delete_card_api_cards_card_id_delete,
)
from mcp.server.fastmcp import FastMCP


async def get_authenticated_client():
    """
    Returns an AuthenticatedClient instance with a valid access token.
    """
    # Check if token file is missing or token is older than 1 hour (3600 seconds)
    if not os.path.exists(config.token_path) or (
        time.time() - os.path.getmtime(config.token_path) > 3600
    ):
        async with Client(base_url=config.api_base_url) as client:
            response = await login_api_auth_tokens_post.asyncio(
                body=BodyLoginApiAuthTokensPost(
                    grant_type="password",
                    username=config.kanban_username,
                    password=config.kanban_password,
                ),
                client=client,
            )

            if response is None:
                raise ValueError("Failed to get authentication token")

            if isinstance(response, HTTPValidationError):
                raise ValueError(f"Authentication failed: {response.detail}")

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
    response = await list_boards_api_boards_get.asyncio(client=client)

    if response is None:
        return []

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
    board_response = await get_board_api_boards_board_id_get.asyncio(
        board_id=board_id,
        client=client,
    )

    if board_response is None or isinstance(board_response, HTTPValidationError):
        return None

    if include_cards:
        cards_response = await list_cards_api_boards_board_id_cards_get.asyncio(
            board_id=board_id,
            client=client,
        )

        if cards_response is None or isinstance(cards_response, HTTPValidationError):
            cards_response = []

        return {
            "board": board_response.to_dict(),
            "cards": [
                {
                    "id": card.id,
                    "name": card.title,
                    "label": card.labels[0] if card.labels else None,
                    "created_at": card.created_at,
                    "updated_at": card.updated_at,
                }
                for card in cards_response
            ],
        }

    return board_response.to_dict()


@mcp.tool()
async def create_board(board_in: BoardCreate):
    """Create a new board."""
    client = await get_authenticated_client()
    response = await create_board_api_boards_post.asyncio(
        body=BoardInCreate(title=board_in.title, description=board_in.description),
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return None

    return {"id": response.id}


@mcp.tool()
async def update_board(board_id: int, board_in: BoardUpdate):
    """Update a board by its ID."""
    client = await get_authenticated_client()
    response = await update_board_api_boards_board_id_patch.asyncio(
        board_id=board_id,
        body=BoardInUpdate(title=board_in.title, description=board_in.description),
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return None

    return {
        "id": response.id,
        "created_at": response.created_at,
        "updated_at": response.updated_at,
    }


@mcp.tool()
async def delete_board(board_id: int):
    """Delete a board by its ID."""
    client = await get_authenticated_client()
    await delete_board_api_boards_board_id_delete.asyncio(
        board_id=board_id,
        client=client,
    )


@mcp.tool()
async def list_board_cards(board_id: int):
    """List all cards in a board."""
    client = await get_authenticated_client()
    response = await list_cards_api_boards_board_id_cards_get.asyncio(
        board_id=board_id,
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return []

    return [
        {
            "id": card.id,
            "name": card.title,
            "label": card.labels[0] if card.labels else None,
            "created_at": card.created_at,
            "updated_at": card.updated_at,
        }
        for card in response
    ]


@mcp.tool()
async def create_cards(board_id: int, cards_in: list[CardCreate]):
    """Create new cards in a board."""
    client = await get_authenticated_client()
    response = await create_cards_api_boards_board_id_cards_post.asyncio(
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

    if response is None or isinstance(response, HTTPValidationError):
        return []

    return [
        {
            "id": card.id,
            "created_at": card.created_at,
            "updated_at": card.updated_at,
        }
        for card in response
    ]


@mcp.tool()
async def get_card(card_id: int):
    """Get a card by its ID."""
    client = await get_authenticated_client()
    response = await get_card_api_cards_card_id_get.asyncio(
        card_id=card_id,
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return None

    return {
        "id": response.id,
        "name": response.title,
        "description": response.description,
        "column": response.column,
        "labels": response.labels,
        "created_at": response.created_at,
        "updated_at": response.updated_at,
    }


@mcp.tool()
async def update_card(card_id: int, card_in: CardUpdate):
    """Update a card by its ID."""
    client = await get_authenticated_client()

    # Convert string column to CardColumn enum if provided
    card_column = CardColumn(card_in.column) if card_in.column is not None else None

    # Convert string labels to LabelColor enum if provided
    card_labels = (
        [LabelColor(label) for label in card_in.labels]
        if card_in.labels is not None
        else None
    )

    response = await update_card_api_cards_card_id_patch.asyncio(
        card_id=card_id,
        body=CardInUpdate(
            title=card_in.title,
            description=card_in.description,
            column=card_column,
            labels=card_labels,
        ),
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return None

    return {
        "id": response.id,
        "created_at": response.created_at,
        "updated_at": response.updated_at,
    }


@mcp.tool()
async def delete_card(card_id: int):
    """Delete a card by its ID."""
    client = await get_authenticated_client()
    await delete_card_api_cards_card_id_delete.asyncio(
        card_id=card_id,
        client=client,
    )


@mcp.tool()
async def list_board_users(board_id: int):
    """List all users with access to a board."""
    client = await get_authenticated_client()
    response = await list_users_api_boards_board_id_users_get.asyncio(
        board_id=board_id,
        client=client,
    )

    if response is None or isinstance(response, HTTPValidationError):
        return []

    return [
        {
            "id": user.id,
            "email": user.email,
        }
        for user in response
    ]


@mcp.tool()
async def share_board(board_id: int, user_id: int):
    """Share a board with a user."""
    client = await get_authenticated_client()
    await share_board_api_boards_board_id_users_user_id_put.asyncio(
        board_id=board_id,
        user_id=user_id,
        client=client,
    )


@mcp.tool()
async def unshare_board(board_id: int, user_id: int):
    """Remove a user's access to a board."""
    client = await get_authenticated_client()
    await unshare_board_api_boards_board_id_users_user_id_delete.asyncio(
        board_id=board_id,
        user_id=user_id,
        client=client,
    )


if __name__ == "__main__":
    mcp.run()
