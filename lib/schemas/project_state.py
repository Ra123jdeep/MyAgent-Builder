from typing import List, Optional
from pydantic import BaseModel

# --- Agent Output Schemas ---

class PlannerOutput(BaseModel):
    vision: str
    target_audience: List[str]
    problem_statement: str
    unique_differentiator: str
    features: List[dict] # { name, description, priority }

class ArchitectOutput(BaseModel):
    frontend_stack: List[str]
    backend_stack: List[str]
    database_schema: List[dict] # { table, fields }
    infrastructure: List[str]
    deployment_strategy: str

class BuilderOutput(BaseModel):
    roadmap: List[dict] # { phase, steps }
    folder_structure: str
    recommended_libraries: List[str]

class CriticOutput(BaseModel):
    technical_risks: List[str]
    scalability_issues: List[str]
    security_considerations: List[str]
    alternative_approach: Optional[str] = None

class FlowNode(BaseModel):
    id: str
    label: str
    type: str = "default"  # e.g., "input", "output", "default"
    details: Optional[str] = None

class FlowEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None

class ExperienceOutput(BaseModel):
    ui_structure: List[str]
    user_flow: List[str] # Keep for text summary
    user_flow_nodes: List[FlowNode]
    user_flow_edges: List[FlowEdge]
    branding_tone: str
    design_system_ideas: List[str]

# --- Tickets Schema ---

class Ticket(BaseModel):
    id: str
    title: str
    status: str  # e.g., "backlog", "in_progress", "review", "done"

# --- Main Project State ---

class ProjectStateSchema(BaseModel):
    project_id: Optional[str] = None
    idea: str
    
    # New ULTRA-NEXT Fields
    planner_result: Optional[PlannerOutput] = None
    architect_result: Optional[ArchitectOutput] = None
    builder_result: Optional[BuilderOutput] = None
    critic_result: Optional[CriticOutput] = None
    experience_result: Optional[ExperienceOutput] = None
    
    # Kanban Tickets
    tickets: Optional[List[Ticket]] = None
    
    # Legacy fields (kept for backward compatibility if needed, but likely deprecated)
    # idea_analysis: Optional[IdeaAnalysisSchema] 
    # blueprint: Optional[BlueprintSchema]
    # user_flow: Optional[UserFlowSchema]
    # tickets: Optional[list]
    # plan_graph: Optional[PlanGraphSchema]
