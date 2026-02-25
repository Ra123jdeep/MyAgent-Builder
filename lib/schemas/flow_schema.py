from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class FlowNode(BaseModel):
    id: str
    type: Literal["page", "action", "decision", "system"]
    label: str
    description: Optional[str] = None
    section: Optional[str] = Field(
        default=None,
        description="Logical grouping (e.g. onboarding, billing, admin)",
    )


class FlowEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None


class UserFlowSchema(BaseModel):
    idea: str
    nodes: List[FlowNode]
    edges: List[FlowEdge]

