export type IdeaScoreMetric =
  | "market_demand"
  | "feasibility"
  | "uniqueness"
  | "monetization"
  | "scalability"
  | "complexity";

export interface IdeaScore {
  metric: IdeaScoreMetric;
  score: number;
  rationale: string;
}

export interface IdeaAnalysisSchema {
  idea: string;
  summary: string;
  target_users: string[];
  key_pain_points: string[];
  scores: IdeaScore[];
  overall_score: number;
  risks: string[];
  opportunities: string[];
  recommendation: "proceed" | "pivot" | "reject";
  notes?: string | null;
}

export type FeatureCategory = "core" | "nice_to_have" | "admin" | "integration";
export type FeaturePriority = "p0" | "p1" | "p2" | "p3";
export type FeatureComplexity = "low" | "medium" | "high";

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  priority: FeaturePriority;
  complexity: FeatureComplexity;
  dependencies: string[];
}

export type TechLayer = "frontend" | "backend" | "database" | "infra" | "ai" | "devops";

export interface TechStackItem {
  layer: TechLayer;
  technology: string;
  rationale: string;
}

export interface DataModelField {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export interface DataModel {
  name: string;
  description: string;
  fields: DataModelField[];
}

export interface PricingTier {
  name: string;
  price_per_month: number;
  target_user: string;
  features_included: string[];
  notes?: string | null;
}

export interface BlueprintSchema {
  idea: string;
  product_name: string;
  elevator_pitch: string;
  features: Feature[];
  tech_stack: TechStackItem[];
  data_models: DataModel[];
  pricing_strategy: PricingTier[];
  non_goals: string[];
}

export type FlowNodeType = "page" | "action" | "decision" | "system";

export interface FlowNode {
  id: string;
  type: FlowNodeType;
  label: string;
  description?: string | null;
  section?: string | null;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string | null;
}

export interface UserFlowSchema {
  idea: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export type TicketStatus = "backlog" | "in_progress" | "review" | "done";
export type TicketType = "feature" | "task" | "bug" | "chore";

export interface KanbanTicketSchema {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  type: TicketType;
  feature_id?: string | null;
  estimate?: number | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export type PlanNodeType = "planner" | "validator" | "architect" | "flow" | "tickets" | "devops";
export type PlanNodeStatus = "pending" | "running" | "completed" | "failed";

export interface PlanGraphNode {
  id: string;
  type: PlanNodeType;
  label: string;
  description?: string | null;
  status: PlanNodeStatus;
}

export interface PlanGraphEdge {
  id: string;
  source: string;
  target: string;
  description?: string | null;
}

export interface PlanGraphSchema {
  idea: string;
  nodes: PlanGraphNode[];
  edges: PlanGraphEdge[];
  metadata: Record<string, string>;
}

export interface ProjectStateSchema {
  idea: string;
  idea_analysis: IdeaAnalysisSchema;
  blueprint: BlueprintSchema;
  user_flow: UserFlowSchema;
  tickets: KanbanTicketSchema[];
  plan_graph: PlanGraphSchema;
  project_id?: string | null;
}

