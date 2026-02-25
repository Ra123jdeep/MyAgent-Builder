from dotenv import load_dotenv
import os
import socket

# Force IPv4 for all socket connections to fix network timeouts
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    agent_architect,
    agent_flow,
    agent_plan,
    agent_tickets,
    agent_validate,
)


app = FastAPI(
    title="MyAgent Builder API",
    version="0.1.0",
    description="Multi-agent orchestration backend for MyAgent Builder.",
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.on_event("startup")
async def startup_db_client():
    pass


app.include_router(agent_plan.router, prefix="/agent", tags=["planner"])
app.include_router(agent_validate.router, prefix="/agent", tags=["validator"])
app.include_router(agent_architect.router, prefix="/agent", tags=["architect"])
app.include_router(agent_flow.router, prefix="/agent", tags=["flow"])
app.include_router(agent_tickets.router, prefix="/agent", tags=["tickets"])

from .routers import project_state, agent_execute
app.include_router(project_state.router, prefix="/project", tags=["state"])
app.include_router(agent_execute.router, prefix="/agent", tags=["execute"])

