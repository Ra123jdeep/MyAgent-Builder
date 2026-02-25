from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

from lib.schemas.ticket_schema import KanbanTicketSchema
from packages.agents.ticket_agent import TicketGeneratorAgent


router = APIRouter()


class TicketsRequest(BaseModel):
    idea: str
    feature_summaries: List[str]


@router.post("/tickets", response_model=list[KanbanTicketSchema])
async def generate_tickets(payload: TicketsRequest) -> list[KanbanTicketSchema]:
    agent = TicketGeneratorAgent()
    return await agent.generate_tickets(payload.idea, payload.feature_summaries)

