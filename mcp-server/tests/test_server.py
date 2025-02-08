from mcp import ClientSession
from pytest import mark
from mcp.types import CallToolResult, TextContent
import json
from pytest_asyncio import fixture
from tests.conftest import fake


def extract_text_content(response: CallToolResult) -> dict:
    assert response.content is not None
    assert isinstance(response.content[0], TextContent)
    content = json.loads(response.content[0].text)
    assert content is not None
    return content


@fixture
async def board(session: ClientSession) -> tuple[dict, int]:
    data = {
        "board_in": {
            "title": fake.sentence(),
            "description": fake.text(),
        }
    }
    response: CallToolResult = await session.call_tool("create_board", data)
    assert not response.isError
    content = extract_text_content(response)
    return data, content["id"]


@mark.asyncio
async def test_list_boards(session: ClientSession):
    response: CallToolResult = await session.call_tool("list_boards", {})
    assert not response.isError


@mark.asyncio
async def test_create_board(session: ClientSession):
    data = {
        "board_in": {
            "title": fake.sentence(),
            "description": fake.text(),
        }
    }
    response: CallToolResult = await session.call_tool("create_board", data)
    content = extract_text_content(response)
    assert "id" in content


@mark.asyncio
async def test_get_board(session: ClientSession, board: tuple[dict, int]):
    data, board_id = board
    response: CallToolResult = await session.call_tool(
        "get_board", {"board_id": board_id}
    )
    assert not response.isError

    response: CallToolResult = await session.call_tool(
        "get_board", {"board_id": board_id, "include_cards": True}
    )
    assert not response.isError
    content = extract_text_content(response)
    assert "cards" in content
    assert len(content["cards"]) == 0


@mark.asyncio
async def test_update_board(session: ClientSession, board: tuple[dict, int]):
    data, board_id = board
    new_title = fake.sentence()

    response: CallToolResult = await session.call_tool(
        "update_board", {"board_id": board_id, "board_in": {"title": new_title}}
    )
    assert not response.isError
