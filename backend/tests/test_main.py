from fastapi.testclient import TestClient
from tests.conftest import client

def test_get_root(client: TestClient):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Simple Kanban API. Go to /docs for documentation."}