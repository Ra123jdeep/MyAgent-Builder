import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type IdeaPayload = { idea: string };

export async function planIdea(idea: string, fullPipeline: boolean = true) {
  const res = await axios.post(`${API_BASE_URL}/agent/plan`, { idea, full_pipeline: fullPipeline });
  return res.data;
}

export async function validateIdea(idea: string) {
  const res = await axios.post(`${API_BASE_URL}/agent/validate`, { idea });
  return res.data;
}

export async function architectIdea(features: any[]) {
  const res = await axios.post(`${API_BASE_URL}/agent/architect`, { features });
  return res.data;
}

export async function fetchFlow(idea: string, blueprintSummary?: string) {
  const res = await axios.post(`${API_BASE_URL}/agent/flow`, {
    idea,
    blueprint_summary: blueprintSummary ?? null
  });
  return res.data;
}

export async function generateTickets(idea: string, featureSummaries: string[]) {
  const res = await axios.post(`${API_BASE_URL}/agent/tickets`, {
    idea,
    feature_summaries: featureSummaries
  });
  return res.data;
}

export async function executeProject(projectId: string) {
  const res = await axios.post(`${API_BASE_URL}/agent/execute`, {
    project_id: projectId
  });
  return res.data;
}

