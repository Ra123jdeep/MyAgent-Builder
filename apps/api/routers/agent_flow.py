from fastapi import APIRouter
from pydantic import BaseModel

from lib.schemas.flow_schema import UserFlowSchema
from packages.agents.flow_agent import FlowDesignerAgent


router = APIRouter()


class FlowRequest(BaseModel):
    idea: str
    blueprint_summary: str | None = None


@router.post("/flow", response_model=UserFlowSchema)
async def design_flow(payload: FlowRequest) -> UserFlowSchema:
    agent = FlowDesignerAgent()
    return await agent.design_flows(payload.idea, payload.blueprint_summary)

