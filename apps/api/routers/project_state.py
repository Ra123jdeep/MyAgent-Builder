import json
import os
import asyncio
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from lib.db.memory_store import LOCAL_DB_PATH

router = APIRouter()


def _get_latest_project():
    """Helper to get the most recently created project from local_db.json"""
    if not os.path.exists(LOCAL_DB_PATH):
        return None
        
    try:
        with open(LOCAL_DB_PATH, "r") as f:
            db = json.load(f)
            
        if not db:
            return None
            
        projects = list(db.values())
        if not projects:
            return None
            
        try:
            projects.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        except Exception:
            pass
            
        return projects[0]
    except Exception:
        return None


async def state_streamer():
    """Yields SSE events whenever local_db.json changes."""
    last_mtime = 0
    
    while True:
        try:
            if os.path.exists(LOCAL_DB_PATH):
                current_mtime = os.path.getmtime(LOCAL_DB_PATH)
                if current_mtime > last_mtime:
                    last_mtime = current_mtime
                    
                    # File changed! Read latest project state
                    latest = _get_latest_project()
                    if latest:
                        # Yield SSE formatted data
                        data = json.dumps(latest)
                        yield f"data: {data}\n\n"
        except Exception as e:
            print(f"SSE Error: {e}")
            
        await asyncio.sleep(1.0) # Check every second


@router.get("/stream")
async def stream_project_state():
    """SSE Endpoint for real-time frontend updates of the project state (especially Tickets)."""
    return StreamingResponse(state_streamer(), media_type="text/event-stream")
