from fastapi import APIRouter
from pydantic import BaseModel

from lib.schemas.project_state import ArchitectOutput
from packages.agents.architect_agent import ArchitectAgent


router = APIRouter()


class ArchitectRequest(BaseModel):
    features: list[dict]


@router.post("/architect", response_model=ArchitectOutput)
async def architect_idea(payload: ArchitectRequest) -> ArchitectOutput:
    agent = ArchitectAgent()
    return await agent.architect(payload.features)

