import json
import os
import sys

from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("MyAgent Builder MCP")

LOCAL_DB_PATH = "local_db.json"

def _get_latest_project():
    """Helper to get the most recently created project from local_db.json"""
    if not os.path.exists(LOCAL_DB_PATH):
        return None
        
    try:
        with open(LOCAL_DB_PATH, "r") as f:
            db = json.load(f)
            
        if not db:
            return None
            
        # Get the project with the newest created_at, or just the last one
        projects = list(db.values())
        if not projects:
            return None
            
        # Attempt to sort by created_at if it exists
        try:
            projects.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        except Exception:
            pass
            
        return projects[0]
    except Exception as e:
        print(f"Error reading local db: {e}", file=sys.stderr)
        return None

def _save_local(db_content):
    with open(LOCAL_DB_PATH, "w") as f:
        json.dump(db_content, f, indent=2, default=str)


@mcp.resource("project://state")
def get_project_state() -> str:
    """Read the current project's SaaS blueprint, architecture, and Kanban tickets."""
    project = _get_latest_project()
    if not project:
        return "No project state found. Please generate a blueprint in the web UI first."
        
    return json.dumps(project, indent=2)


@mcp.tool()
def update_ticket_status(ticket_id: str, new_status: str) -> str:
    """
    Update the status of a Kanban ticket in the project.
    Valid statuses: 'backlog', 'in_progress', 'review', 'done'.
    """
    valid_statuses = ["backlog", "in_progress", "review", "done"]
    if new_status not in valid_statuses:
        return f"Error: Invalid status '{new_status}'. Must be one of {valid_statuses}."

    if not os.path.exists(LOCAL_DB_PATH):
        return "Error: Database not found."
        
    try:
        with open(LOCAL_DB_PATH, "r") as f:
            db = json.load(f)
            
        ticket_found = False
        project_updated = None
        
        # We update the ticket wherever we find it
        for pid, project in db.items():
            tickets = project.get("tickets", [])
            for t in tickets:
                if t.get("id") == ticket_id:
                    t["status"] = new_status
                    ticket_found = True
                    project_updated = pid
                    break
            if ticket_found:
                break
                
        if not ticket_found:
            return f"Error: Ticket '{ticket_id}' not found."
            
        _save_local(db)
        return f"Successfully updated ticket '{ticket_id}' to '{new_status}'."
        
    except Exception as e:
        return f"Error updating ticket: {str(e)}"


if __name__ == "__main__":
    # Ensure we run from the project root where local_db.json is
    workspace_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    if os.path.basename(workspace_root) == "MyAgent Builder":
        os.chdir(workspace_root)
        
    mcp.run()
