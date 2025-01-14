from fastapi.testclient import TestClient

from tests.conftest import auth_client, fake


def test_list_boards(auth_client: TestClient):
    response = auth_client.get("/boards")
    assert response.status_code == 200


def test_create_board(auth_client: TestClient):
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    assert response.status_code == 201
    assert response.json()["title"] == data["title"]
    assert response.json()["description"] == data["description"]
    assert response.json()["id"] is not None


def test_get_board(auth_client: TestClient):
    # create board first
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    assert response.status_code == 201

    response = auth_client.get(f"/boards/{response.json()['id']}")
    assert response.status_code == 200
    assert response.json()["title"] == data["title"]
    assert response.json()["description"] == data["description"]
    assert response.json()["id"] is not None


def test_delete_board(auth_client: TestClient):
    # create board first
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    assert response.status_code == 201

    response = auth_client.delete(f"/boards/{response.json()['id']}")
    assert response.status_code == 204


def test_update_board(auth_client: TestClient):
    # create board first
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    assert response.status_code == 201

    # test for individual fields even labels
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.patch(f"/boards/{response.json()['id']}", json=data)
    assert response.status_code == 200
    assert response.json()["title"] == data["title"]
    assert response.json()["description"] == data["description"]

    # test for labels
    data = {"labels": [{"color": "red", "name": "red"}, {"color": "blue", "name": "blue"}]}
    response = auth_client.patch(f"/boards/{response.json()['id']}", json=data)
    assert response.status_code == 200
    assert set(tuple(label.items()) for label in response.json()["labels"]) >= set(
        tuple(label.items()) for label in data["labels"]
    )


def test_create_cards(auth_client: TestClient):
    # create board first
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    board_id = response.json()["id"]
    assert response.status_code == 201

    # single card
    data = [{"title": fake.sentence(), "description": fake.sentence()}]
    response = auth_client.post(f"/boards/{board_id}/cards", json=data)
    assert response.status_code == 201
    assert len(response.json()) == 1
    assert response.json()[0]["title"] == data[0]["title"]
    assert response.json()[0]["description"] == data[0]["description"]
    assert response.json()[0]["id"] is not None

    # multiple cards
    data = [
        {"title": fake.sentence(), "column": "TODO"},
        {"title": fake.sentence(), "description": fake.sentence()},
    ]
    response = auth_client.post(f"/boards/{board_id}/cards", json=data)
    assert response.status_code == 201
    assert len(response.json()) == 2
    assert set(card["title"] for card in response.json()) == set(d["title"] for d in data)


def test_list_cards(auth_client: TestClient):
    # create board first
    data = {"title": fake.sentence(), "description": fake.sentence()}
    response = auth_client.post("/boards", json=data)
    board_id = response.json()["id"]
    assert response.status_code == 201

    # no cards
    response = auth_client.get(f"/boards/{response.json()['id']}/cards")
    assert response.status_code == 200
    assert len(response.json()) == 0

    # create N cards
    N = 10
    data = [{"title": fake.sentence(), "description": fake.sentence()} for _ in range(N)]
    response = auth_client.post(f"/boards/{board_id}/cards", json=data)
    assert response.status_code == 201
    assert len(response.json()) == N

    # list cards
    response = auth_client.get(f"/boards/{board_id}/cards")
    assert response.status_code == 200
    assert len(response.json()) == N
    assert set(card["title"] for card in response.json()) == set(d["title"] for d in data)


# TODO: share and unshare board

# def test_share_board(auth_client: TestClient, fake_auth_client: TestClient):
#     fake_user_id = fake_auth_client.get("/users/me").json()["id"]

#     print(fake_user_id)
#     print(auth_client.get("/users/me").json())

#     # create board
#     data = {"title": fake.sentence(), "description": fake.sentence()}
#     response = auth_client.post("/boards", json=data)
#     board_id = response.json()["id"]
#     assert response.status_code == 201

#     # test that the user cannot see the board
#     response = fake_auth_client.get(f"/boards/{board_id}")
#     assert response.status_code == 404

#     # share board
#     response = auth_client.put(f"/boards/{board_id}/users/{fake_user_id}")
#     assert response.status_code == 200

#     # test that the user can see the board
#     response = fake_auth_client.get(f"/boards/{board_id}")
#     assert response.status_code == 200
#     assert response.json()["id"] == board_id
