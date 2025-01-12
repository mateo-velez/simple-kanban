from fastapi.testclient import TestClient
from tests.conftest import client, fake, auth_client


# test creat user status code and correct output
# test create user existing email


def test_create_user(client: TestClient):
    data = {"email": fake.email(), "password": fake.password()}
    response = client.post("/users", json=data)
    assert response.status_code == 201
    assert response.json()["email"] == data["email"]
    assert response.json()["id"] is not None


def test_create_user_existing_email(client: TestClient):
    data = {"email": fake.email(), "password": fake.password()}
    response = client.post("/users", json=data)
    assert response.status_code == 201

    response = client.post("/users", json=data)
    assert response.status_code == 409


def test_get_me(auth_client: TestClient):
    response = auth_client.get("/users/me")
    assert response.status_code == 200
    assert response.json()["email"] == "user@email.com"
    assert response.json()["id"] is not None
