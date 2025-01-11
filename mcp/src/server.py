from mcp.server.fastmcp import FastMCP
from .client.models import (
    Token,
    Body_login_auth_tokens_post,
    BoardInCreate,
    BoardInUpdate,
    BoardOut,
    CardInCreate,
    CardInUpdate,
    CardOut,
)
from .client.services import (
    async_auth_service,
    async_boards_service,
    async_cards_service,
)
from .client.api_config import APIConfig
from .config import config
import json
import os

mcp = FastMCP()


def get_api_config() -> APIConfig:
    if not os.path.exists(config.token_path):
        raise FileNotFoundError(f"Token file not found: {config.token_path}")

    with open(config.token_path, "r") as file:
        token = json.load(file)

    api_config = APIConfig(base_path=config.api_base_url)
    api_config.set_access_token(token["access_token"])
    return api_config


@mcp.tool()
async def login(username: str, password: str):
    """Login with username and password to get authentication token."""
    api_config = APIConfig(base_path=config.api_base_url)
    response: Token = await async_auth_service.login_auth_tokens_post(
        data=Body_login_auth_tokens_post(username=username, password=password),
        api_config_override=api_config,
    )
    with open(config.token_path, "w") as file:
        json.dump(response.dict(), file)


@mcp.tool()
async def list_boards():
    """Get list of all boards."""
    api_config = get_api_config()
    response: list[BoardOut] = await async_boards_service.list_boards_boards_get(
        api_config_override=api_config
    )
    return response


@mcp.tool()
async def get_board(board_id: int):
    """Get a board and its cards by ID."""
    api_config = get_api_config()
    board_out: BoardOut = await async_boards_service.get_board_boards_board_id_get(
        board_id=board_id,
        api_config_override=api_config,
    )

    cards_out: list[CardOut] = (
        await async_boards_service.list_cards_boards_board_id_cards_get(
            board_id=board_id,
            api_config_override=api_config,
        )
    )
    return board_out, cards_out


@mcp.tool()
async def create_board(board_in_create: BoardInCreate):
    """Create a new board."""
    api_config = get_api_config()
    response: BoardOut = await async_boards_service.create_board_boards_post(
        data=board_in_create,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def update_board(board_id: int, board_in_update: BoardInUpdate):
    """Update a board by its ID."""
    api_config = get_api_config()
    response: BoardOut = await async_boards_service.update_board_boards_board_id_patch(
        board_id=board_id,
        data=board_in_update,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def delete_board(board_id: int):
    """Delete a board by its ID."""
    api_config = get_api_config()
    await async_boards_service.delete_board_boards_board_id_delete(
        board_id=board_id,
        api_config_override=api_config,
    )


@mcp.tool()
async def create_card(board_id: int, card_in_create: CardInCreate):
    """Create a new card in the specified board."""
    api_config = get_api_config()
    response: CardOut = (
        await async_boards_service.create_cards_boards_board_id_cards_post(
            board_id=board_id,
            data=[card_in_create],
            api_config_override=api_config,
        )
    )
    return response


@mcp.tool()
async def get_card(card_id: int):
    """Get a card by its ID."""
    api_config = get_api_config()
    response: CardOut = await async_cards_service.get_card_cards_card_id_get(
        card_id=card_id,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def update_card(card_id: int, card_in_update: CardInUpdate):
    """Update a card by its ID."""
    api_config = get_api_config()
    response: CardOut = await async_cards_service.update_card_cards_card_id_patch(
        card_id=card_id,
        data=card_in_update,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def delete_card(card_id: int):
    """Delete a card by its ID."""
    api_config = get_api_config()
    await async_cards_service.delete_card_cards_card_id_delete(
        card_id=card_id,
        api_config_override=api_config,
    )


if __name__ == "__main__":
    mcp.run()
