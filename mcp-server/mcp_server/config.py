from pydantic_settings import BaseSettings


class Config(BaseSettings):
    api_base_url: str
    token_path: str = "/tmp/token.json"
    kanban_username: str
    kanban_password: str

    model_config = {
        "env_file": ".env",
        "env_prefix": "MCP_",
        "case_sensitive": False,
    }


config = Config()  # type: ignore
