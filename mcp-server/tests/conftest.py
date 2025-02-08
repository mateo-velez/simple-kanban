from mcp import StdioServerParameters, ClientSession
from mcp.client.stdio import stdio_client
from pytest_asyncio import fixture
from faker import Faker

fake = Faker()

server_params = StdioServerParameters(
    command="poetry",  # Executable
    args=[
        "run",
        "python3",
        "-m",
        "mcp_server.server",
    ],  # Optional command line arguments
    env={
        "MCP_API_BASE_URL": "http://0.0.0.0:8000",
        "MCP_KANBAN_USERNAME": "user@example.com",
        "MCP_KANBAN_PASSWORD": "password",
    },
)


@fixture(scope="function")
async def session():
    stdio = stdio_client(server_params)
    reader, writer = await stdio.__aenter__()
    client_session = ClientSession(reader, writer)
    await client_session.__aenter__()
    await client_session.initialize()
    try:
        yield client_session
    finally:
        pass
        # await client_session.__aexit__(None, None, None)
        # await stdio.__aexit__(None, None, None)
