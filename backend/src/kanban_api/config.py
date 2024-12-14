from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Simple Kanban API"
    debug: bool = False
    secret_key: str
    algorithm: str
    db_url: str
    db_echo: bool = False
    drop_all: bool = False
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"



settings = Settings()
