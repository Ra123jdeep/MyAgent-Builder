import uuid
from datetime import datetime
from typing import Any, Optional

from motor.motor_asyncio import AsyncIOMotorCollection

from .mongo import get_memory_collection
from ..schemas.project_state import ProjectStateSchema


async def _collection() -> AsyncIOMotorCollection:
    return await get_memory_collection()  # type: ignore[return-value]


async def save_project_state(state: ProjectStateSchema) -> str:
    payload = state.model_dump()
    payload["created_at"] = datetime.utcnow()
    
    col = await _collection()
    result = await col.insert_one(payload)
    return str(result.inserted_id)


async def get_project_state(project_id: str) -> Optional[ProjectStateSchema]:
    from bson import ObjectId, errors
    
    col = await _collection()
    try:
        doc = await col.find_one({"_id": ObjectId(project_id)})
    except errors.InvalidId:
        doc = None
        
    if doc:
        doc["project_id"] = str(doc["_id"])
        return ProjectStateSchema.model_validate(doc)
        
    return None

