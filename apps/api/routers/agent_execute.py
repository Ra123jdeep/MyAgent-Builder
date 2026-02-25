import json
import os
import asyncio
from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel

from lib.db.memory_store import LOCAL_DB_PATH
from lib.schemas.project_state import ProjectStateSchema

router = APIRouter()

class ExecuteRequest(BaseModel):
    project_id: str

def _save_local(db_content):
    with open(LOCAL_DB_PATH, "w") as f:
        json.dump(db_content, f, indent=2, default=str)

async def _autonomous_execution_loop(project_id: str):
    """
    Background loop that acts as the internal Cursor/Agent.
    It reads the project state, finds pending tickets, and sequentially marks them in_progress -> done.
    """
    if not os.path.exists(LOCAL_DB_PATH):
        print(f"Agent Execute Error: No local db found at {LOCAL_DB_PATH}")
        return

    # Loop forever until all tickets are done or we hit an error
    while True:
        try:
            with open(LOCAL_DB_PATH, "r") as f:
                db = json.load(f)
                
            project = db.get(project_id)
            if not project:
                print(f"Agent Execute Error: Project {project_id} not found.")
                break
                
            tickets = project.get("tickets", [])
            
            # Find the next backlog ticket
            next_ticket = next((t for t in tickets if t.get("status") == "backlog"), None)
            
            # If no backlog tickets, check if there are any stuck in_progress
            if not next_ticket:
                in_progress_ticket = next((t for t in tickets if t.get("status") == "in_progress"), None)
                if in_progress_ticket:
                     # Simulate finishing it
                     in_progress_ticket["status"] = "done"
                     _save_local(db)
                     await asyncio.sleep(2)
                     continue # Check again
                else:
                    print("All tickets completed. The swarm can rest.")
                    break # Everything is done!

            # 1. Mark ticket as In Progress
            next_ticket["status"] = "in_progress"
            print(f"Agent Swarm: Starting work on '{next_ticket.get('title')}'...")
            _save_local(db) # This triggers the SSE to the frontend automatically!
            
            # 2. Simulate AI thinking / coding (In reality, we would call an LLM here)
            # Generating code files to an output dir could go here.
            await asyncio.sleep(4) # Pretend it takes 4 seconds to write the code
            
            # 3. Mark ticket as Done
            next_ticket["status"] = "done"
            print(f"Agent Swarm: Completed '{next_ticket.get('title')}'.")
            _save_local(db)
            
            # Brief pause before picking up the next ticket
            await asyncio.sleep(1)

        except Exception as e:
            print(f"Execution Loop Error: {e}")
            break


@router.post("/execute")
async def start_execution(payload: ExecuteRequest, background_tasks: BackgroundTasks):
    """
    Endpoint called from the frontend when the user clicks 'Deploy AI Swarm'.
    Kicks off the autonomous coding loop in the background.
    """
    # Verify project exists first
    try:
        with open(LOCAL_DB_PATH, "r") as f:
            db = json.load(f)
            if payload.project_id not in db:
                raise HTTPException(status_code=404, detail="Project not found.")
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
         
    # Launch the swarm!
    background_tasks.add_task(_autonomous_execution_loop, payload.project_id)
    return {"status": "success", "message": "The AI Swarm has been deployed."}
