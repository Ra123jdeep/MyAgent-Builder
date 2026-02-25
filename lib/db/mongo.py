import os
from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase


MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "myagent_builder")


_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGODB_URI)
    return _client


def get_db() -> AsyncIOMotorDatabase:
    client = get_client()
    return client[MONGODB_DB_NAME]


async def get_memory_collection() -> Any:
    """
    Returns the collection used as a simple memory store
    for agent runs and project state snapshots.
    """
    db = get_db()
    return db["agent_memory"]

