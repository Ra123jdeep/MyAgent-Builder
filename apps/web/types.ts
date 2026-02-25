export interface ProjectState {
    project_id?: string;
    title?: string;
    idea: string;

    planner_result?: PlannerOutput;
    architect_result?: ArchitectOutput;
    builder_result?: BuilderOutput;
    critic_result?: CriticOutput;
    experience_result?: ExperienceOutput;
    tickets?: Ticket[];
}

export interface PlannerOutput {
    vision: string;
    target_audience: string[];
    problem_statement: string;
    unique_differentiator: string;
    features: { name: string; description: string; priority: string }[];
}

export interface ArchitectOutput {
    frontend_stack: string[];
    backend_stack: string[];
    database_schema: { table: string; fields: string[] }[];
    infrastructure: string[];
    deployment_strategy: string;
}

export interface BuilderOutput {
    roadmap: { phase: string; steps: string[] }[];
    folder_structure: string;
    recommended_libraries: string[];
}

export interface CriticOutput {
    technical_risks: string[];
    scalability_issues: string[];
    security_considerations: string[];
    alternative_approach?: string;
}

export interface FlowNode {
    id: string;
    label: string;
    type: string;
    details?: string;
}

export interface FlowEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
}

export interface ExperienceOutput {
    ui_structure: string[];
    user_flow: string[];
    user_flow_nodes: FlowNode[];
    user_flow_edges: FlowEdge[];
    branding_tone: string;
    design_system_ideas: string[];
}

export interface Ticket {
    id: string;
    title: string;
    status: "backlog" | "in_progress" | "review" | "done";
}
