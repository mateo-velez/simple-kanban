from mcp.server.fastmcp import FastMCP
from src.client.models import (
    Token,
    Body_login_auth_tokens_post,
    BoardInCreate,
    BoardInUpdate,
    BoardOut,
    CardInCreate,
    CardInUpdate,
    CardOut,
)
from src.client.services.async_auth_service import login_auth_tokens_post
from src.client.services.async_boards_service import (
    list_boards_boards_get,
    get_board_boards__board_id__get,
    list_cards_boards__board_id__cards_get,
    create_board_boards_post,
    update_board_boards__board_id__patch,
    delete_board_boards__board_id__delete,
    create_cards_boards__board_id__cards_post,
)
from src.client.services.async_cards_service import (
    get_card_cards__card_id__get,
    update_card_cards__card_id__patch,
    delete_card_cards__card_id__delete,
)
from src.client.api_config import APIConfig
from src.config import config
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
    response: Token = await login_auth_tokens_post(
        data=Body_login_auth_tokens_post(
            grant_type="password",
            username=username,
            password=password,
            client_id="string",
            client_secret="string",
        ),
        api_config_override=api_config,
    )
    print(response)
    with open(config.token_path, "w") as file:
        json.dump(response.dict(), file)


@mcp.tool()
async def list_boards():
    """Get list of all boards."""
    api_config = get_api_config()
    response: list[BoardOut] = await list_boards_boards_get(
        api_config_override=api_config
    )
    return response


@mcp.tool()
async def get_board(board_id: int):
    """Get a board and its cards by ID."""
    api_config = get_api_config()
    board_out: BoardOut = await get_board_boards__board_id__get(
        board_id=board_id,
        api_config_override=api_config,
    )

    cards_out: list[CardOut] = await list_cards_boards__board_id__cards_get(
        board_id=board_id,
        api_config_override=api_config,
    )
    return {"board": board_out, "cards": cards_out}


@mcp.tool()
async def create_board(board_in_create: BoardInCreate):
    """Create a new board."""
    api_config = get_api_config()
    response: BoardOut = await create_board_boards_post(
        data=board_in_create,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def update_board(board_id: int, board_in_update: BoardInUpdate):
    """Update a board by its ID."""
    api_config = get_api_config()
    response: BoardOut = await update_board_boards__board_id__patch(
        board_id=board_id,
        data=board_in_update,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def delete_board(board_id: int):
    """Delete a board by its ID."""
    api_config = get_api_config()
    await delete_board_boards__board_id__delete(
        board_id=board_id,
        api_config_override=api_config,
    )


@mcp.tool()
async def create_cards(board_id: int, cards_in_create: list[CardInCreate]):
    """Create a new card in the specified board."""
    api_config = get_api_config()
    response: list[CardOut] = await create_cards_boards__board_id__cards_post(
        board_id=board_id,
        data=cards_in_create,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def get_card(card_id: int):
    """Get a card by its ID."""
    api_config = get_api_config()
    response: CardOut = await get_card_cards__card_id__get(
        card_id=card_id,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def update_card(card_id: int, card_in_update: CardInUpdate):
    """Update a card by its ID."""
    api_config = get_api_config()
    response: CardOut = await update_card_cards__card_id__patch(
        card_id=card_id,
        data=card_in_update,
        api_config_override=api_config,
    )
    return response


@mcp.tool()
async def delete_card(card_id: int):
    """Delete a card by its ID."""
    api_config = get_api_config()
    await delete_card_cards__card_id__delete(
        card_id=card_id,
        api_config_override=api_config,
    )


if __name__ == "__main__":
    mcp.run()
