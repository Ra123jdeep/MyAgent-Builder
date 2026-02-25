from typing import Union
from fastapi import APIRouter
from pydantic import BaseModel

from lib.schemas.plan_graph import PlanGraphSchema
from lib.schemas.project_state import ProjectStateSchema, PlannerOutput
from lib.tools.orchestrator import Orchestrator


router = APIRouter()


class IdeaRequest(BaseModel):
    idea: str
    full_pipeline: bool = False


@router.post("/plan", response_model=Union[PlanGraphSchema, ProjectStateSchema, PlannerOutput])
async def plan_idea(payload: IdeaRequest) -> Union[PlanGraphSchema, ProjectStateSchema, PlannerOutput]:
    """
    If full_pipeline is False, only run the Planner agent and return PlanGraphSchema.
    If full_pipeline is True, run the entire orchestration loop and return ProjectStateSchema.
    """
    orchestrator = Orchestrator()
    if payload.full_pipeline:
        project_state = await orchestrator.run(payload.idea)
        return project_state

    # Planner-only mode
    plan_graph = await orchestrator.planner.plan(payload.idea)
    return plan_graph

