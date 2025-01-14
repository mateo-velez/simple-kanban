from typing import Generator

from faker import Faker
from fastapi.testclient import TestClient
from pytest import fixture

fake = Faker()


@fixture(scope="session")
def client() -> Generator[TestClient, None, None]:
    from kanban_api.main import app

    with TestClient(app, base_url="http://testserver/api") as client:
        yield client


@fixture(scope="session")
def auth_client(client: TestClient) -> TestClient:
    data = {"email": fake.email(), "password": fake.password()}
    response = client.post("/users", json=data)
    assert response.status_code == 201
    response = client.post(
        "/auth/tokens", data={"username": data["email"], "password": data["password"]}
    )
    assert response.status_code == 200
    client.headers["Authorization"] = f"Bearer {response.json()['access_token']}"
    return client
