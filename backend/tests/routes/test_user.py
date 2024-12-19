from datetime import datetime
from fastapi.testclient import TestClient
from tests.conftest import client, fake




def test_create_user(client: TestClient):
    data = {
        "email": fake.email(),
        "password": fake.password()
    }
    response = client.post("/users", json=data)
    assert response.status_code == 201
    assert response.json()["email"] == data["email"]
    assert response.json()["id"] is not None
    assert response.json()["createdAt"] is not None
    assert response.json()["updatedAt"] is not None



def test_authenticate_user(client: TestClient):
    
