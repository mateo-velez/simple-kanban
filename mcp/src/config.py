from pydantic_settings import BaseSettings


class Config(BaseSettings):
    api_base_url: str
    token_path: str = "/tmp/token.json"


config = Config()
