from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class Feature(BaseModel):
    id: str
    name: str
    description: str
    category: Literal["core", "nice_to_have", "admin", "integration"]
    priority: Literal["p0", "p1", "p2", "p3"]
    complexity: Literal["low", "medium", "high"]
    dependencies: List[str] = Field(default_factory=list)


class TechStackItem(BaseModel):
    layer: Literal["frontend", "backend", "database", "infra", "ai", "devops"]
    technology: str
    rationale: str


class PricingTier(BaseModel):
    name: str
    price_per_month: float
    target_user: str
    features_included: List[str]
    notes: Optional[str] = None


class DataModelField(BaseModel):
    name: str
    type: str
    description: str
    required: bool = True


class DataModel(BaseModel):
    name: str
    description: str
    fields: List[DataModelField]


class BlueprintSchema(BaseModel):
    idea: str
    product_name: str
    elevator_pitch: str
    features: List[Feature]
    tech_stack: List[TechStackItem]
    data_models: List[DataModel]
    pricing_strategy: List[PricingTier]
    non_goals: List[str] = Field(default_factory=list)

