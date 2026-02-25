from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class IdeaScore(BaseModel):
    metric: Literal[
        "market_demand",
        "feasibility",
        "uniqueness",
        "monetization",
        "scalability",
        "complexity",
    ]
    score: int = Field(ge=1, le=10)
    rationale: str


class IdeaAnalysisSchema(BaseModel):
    idea: str
    summary: str
    target_users: List[str]
    key_pain_points: List[str]
    scores: List[IdeaScore]
    overall_score: int = Field(ge=1, le=10)
    risks: List[str] = Field(default_factory=list)
    opportunities: List[str] = Field(default_factory=list)
    recommendation: Literal["proceed", "pivot", "reject"]
    notes: Optional[str] = None

