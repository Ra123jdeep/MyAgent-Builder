from fastapi import APIRouter
from pydantic import BaseModel

from lib.schemas.idea_analysis import IdeaAnalysisSchema
from packages.agents.validator_agent import ValidatorAgent


router = APIRouter()


class IdeaRequest(BaseModel):
    idea: str


@router.post("/validate", response_model=IdeaAnalysisSchema)
async def validate_idea(payload: IdeaRequest) -> IdeaAnalysisSchema:
    agent = ValidatorAgent()
    return await agent.validate(payload.idea)

