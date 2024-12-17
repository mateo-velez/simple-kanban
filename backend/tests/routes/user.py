from datetime import datetime
from fastapi.testclient import TestClient
from tests.conftest import client




def test_create_user(client: TestClient):
    response = client.post("/users", json={"email": "test@test.com", "password": "test"})
    assert response.status_code == 201
    response_data = response.json()
    assert response_data["email"] == "test@test.com"
    assert "id" in response_data
    assert "createdAt" in response_data
    assert "updatedAt" in response_data

    created_at = datetime.fromisoformat(response_data["createdAt"].replace("Z", "+00:00"))
    updated_at = datetime.fromisoformat(response_data["updatedAt"].replace("Z", "+00:00"))
    assert abs((updated_at - created_at).total_seconds()) < 1
