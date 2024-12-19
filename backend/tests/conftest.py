from faker import Faker
from fastapi.testclient import TestClient
from kanban_api.main import app
from pytest import fixture

fake = Faker()

@fixture(scope="session")
def client() -> TestClient: # type: ignore
    with TestClient(app) as client:
        # Create user and authenticate
        response = client.post("/users", json={"email": "admin@email.com", "password": "admin"})
        assert response.status_code == 201
        response = client.post("/auth/tokens", data={"username": "admin@email.com", "password": "admin"})
        print(response.json())
        assert response.status_code == 200
        client.headers["Authorization"] = f"Bearer {response.json()['access_token']}"
        
        yield client
