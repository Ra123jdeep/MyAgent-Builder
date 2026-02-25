from typing import Dict, List, Literal, Optional

from pydantic import BaseModel, Field


class PlanGraphNode(BaseModel):
    id: str
    type: Literal["planner", "validator", "architect", "flow", "tickets", "devops"]
    label: str
    description: Optional[str] = None
    status: Literal["pending", "running", "completed", "failed"] = "pending"


class PlanGraphEdge(BaseModel):
    id: str
    source: str
    target: str
    description: Optional[str] = None


class PlanGraphSchema(BaseModel):
    idea: str
    nodes: List[PlanGraphNode]
    edges: List[PlanGraphEdge]
    metadata: Dict[str, str] = Field(default_factory=dict)

