from pydantic_settings import BaseSettings


class Config(BaseSettings):
    api_base_url: str
    token_path: str = "/tmp/token.json"

    model_config = {"env_file": ".env"}


config = Config()
