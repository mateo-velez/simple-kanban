from datetime import datetime
from fastapi.testclient import TestClient
from sqlalchemy import select
from tests.conftest import client


def test_create_board(client: TestClient):
    response = client.post(
        "/users/me/boards",
        json={"name": "Test Board", "description": "Test Description"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Board"
    assert data["description"] == "Test Description"
    assert "id" in data
    assert "createdAt" in data
    assert "updatedAt" in data
    assert "ownerId" in data


def test_list_boards(client: TestClient):
    # Create a board first
    client.post("/users/me/boards", json={"name": "Test Board 1"})
    client.post("/users/me/boards", json={"name": "Test Board 2"})
    
    response = client.get("/users/me/boards")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert all("id" in board for board in data)
    assert all("name" in board for board in data)


def test_get_board(client: TestClient):
    # Create a board first
    create_response = client.post(
        "/users/me/boards",
        json={"name": "Test Board", "description": "Test Description"}
    )
    board_id = create_response.json()["id"]
    
    response = client.get(f"/boards/{board_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Board"
    assert data["description"] == "Test Description"


def test_update_board(client: TestClient):
    # Create a board first
    create_response = client.post(
        "/users/me/boards",
        json={"name": "Test Board", "description": "Test Description"}
    )
    board_id = create_response.json()["id"]
    
    response = client.patch(
        f"/boards/{board_id}",
        json={"name": "Updated Board", "description": "Updated Description"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Updated Board"
    assert data["description"] == "Updated Description"


def test_delete_board(client: TestClient):
    # Create a board first
    create_response = client.post(
        "/users/me/boards",
        json={"name": "Test Board"}
    )
    board_id = create_response.json()["id"]
    
    response = client.delete(f"/boards/{board_id}")
    assert response.status_code == 204
    
    # Verify board is deleted
    response = client.get(f"/boards/{board_id}")
    assert response.status_code == 404


def test_share_board(client: TestClient):
    # Create a second user
    second_user = client.post(
        "/users",
        json={"email": "test2@test.com", "password": "test"}
    ).json()
    
    # Create a board
    board = client.post(
        "/users/me/boards",
        json={"name": "Test Board"}
    ).json()
    
    # Share board with second user
    response = client.put(f"/users/{second_user['id']}/boards/{board['id']}")
    assert response.status_code == 200


def test_unshare_board(client: TestClient):
    # Create a second user
    second_user = client.post(
        "/users",
        json={"email": "test3@test.com", "password": "test"}
    ).json()
    
    # Create a board
    board = client.post(
        "/users/me/boards",
        json={"name": "Test Board"}
    ).json()
    
    # Share board with second user
    client.put(f"/users/{second_user['id']}/boards/{board['id']}")
    
    # Unshare board
    response = client.delete(f"/users/{second_user['id']}/boards/{board['id']}")
    assert response.status_code == 204 