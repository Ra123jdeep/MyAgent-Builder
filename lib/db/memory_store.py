import json
import os
import uuid
from datetime import datetime
from typing import Any, Optional

from motor.motor_asyncio import AsyncIOMotorCollection

from .mongo import get_memory_collection
from ..schemas.project_state import ProjectStateSchema


LOCAL_DB_PATH = "local_db.json"


def _save_local(project_id: str, data: dict):
    try:
        if os.path.exists(LOCAL_DB_PATH):
            with open(LOCAL_DB_PATH, "r") as f:
                db = json.load(f)
        else:
            db = {}
        
        # Convert datetime to string for JSON serialization
        if "created_at" in data and isinstance(data["created_at"], datetime):
            data["created_at"] = data["created_at"].isoformat()
            
        db[project_id] = data
        with open(LOCAL_DB_PATH, "w") as f:
            json.dump(db, f, indent=2, default=str)
    except Exception as e:
        print(f"Failed to save to local DB: {e}")


def _get_local(project_id: str) -> Optional[dict]:
    try:
        if not os.path.exists(LOCAL_DB_PATH):
            return None
        with open(LOCAL_DB_PATH, "r") as f:
            db = json.load(f)
        return db.get(project_id)
    except Exception:
        return None


async def _collection() -> AsyncIOMotorCollection:
    return await get_memory_collection()  # type: ignore[return-value]


async def save_project_state(state: ProjectStateSchema) -> str:
    payload = state.model_dump()
    payload["created_at"] = datetime.utcnow()
    
    try:
        # Try MongoDB first
        col = await _collection()
        result = await col.insert_one(payload)
        return str(result.inserted_id)
    except Exception as e:
        print(f"MongoDB save failed ({e}). Falling back to local file.")
        # Fallback to local
        project_id = str(uuid.uuid4())
        _save_local(project_id, payload)
        return project_id


async def get_project_state(project_id: str) -> Optional[ProjectStateSchema]:
    from bson import ObjectId, errors
    
    try:
        # Try MongoDB first
        col = await _collection()
        try:
            doc = await col.find_one({"_id": ObjectId(project_id)})
        except errors.InvalidId:
            # If ID is not a valid ObjectId (e.g. UUID from local fallback), skip Mongo
            doc = None
            
        if doc:
            doc["project_id"] = str(doc["_id"])
            return ProjectStateSchema.model_validate(doc)
    except Exception as e:
        print(f"MongoDB fetch failed ({e}). Checking local file.")

    # Fallback to local
    doc = _get_local(project_id)
    if doc:
        doc["project_id"] = project_id
        return ProjectStateSchema.model_validate(doc)
        
    return None

