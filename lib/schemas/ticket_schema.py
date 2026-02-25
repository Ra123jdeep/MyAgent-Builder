from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, Field


TicketStatus = Literal["backlog", "in_progress", "review", "done"]
TicketType = Literal["feature", "task", "bug", "chore"]


class KanbanTicketSchema(BaseModel):
    id: str
    title: str
    description: str
    status: TicketStatus = "backlog"
    type: TicketType = "feature"
    feature_id: Optional[str] = Field(
        default=None, description="Link back to Blueprint feature id"
    )
    estimate: Optional[int] = Field(
        default=None, description="Rough estimate in story points"
    )
    tags: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

