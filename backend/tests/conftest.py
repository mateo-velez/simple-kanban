from tempfile import TemporaryDirectory
from faker import Faker
from fastapi.testclient import TestClient
from pytest import fixture
from typing import Generator
import os

fake = Faker()


@fixture(scope="session")
def client() -> Generator[TestClient, None, None]:

    with TemporaryDirectory() as temp_dir:
        os.environ["DB_URL"] = f"sqlite:///{temp_dir}/test.db"
        os.environ["DROP_ALL"] = "true"
        from kanban_api.main import app

        with TestClient(app) as client:
            yield client


@fixture(scope="session")
def auth_client(client: TestClient) -> TestClient:
    response = client.post("/users", json={"email": "user@email.com", "password": "password"})
    assert response.status_code == 201
    response = client.post("/auth/tokens", data={"username": "user@email.com", "password": "password"})
    assert response.status_code == 200
    client.headers["Authorization"] = f"Bearer {response.json()['access_token']}"
    return client
