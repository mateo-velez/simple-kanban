"""A client library for accessing Simple Kanban API"""

from .client import AuthenticatedClient, Client

__all__ = (
    "AuthenticatedClient",
    "Client",
)
