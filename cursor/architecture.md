## MyAgent Builder – High-level Architecture

### Overview

MyAgent Builder is an AI-native platform that transforms a raw SaaS idea into:

- structured product blueprints
- feature architecture
- user flow diagrams
- Kanban development tickets
- an automation-ready project layout for Cursor + MCP

The system is agent-first and JSON-schema driven.

### Monorepo

- `apps/web` – Next.js 14 App Router dashboard (TypeScript, Tailwind, React Flow, dnd-kit).
- `apps/api` – FastAPI backend with modular routers.
- `packages/agents` – Python agents (planner, validator, architect, flow, tickets, devops).
- `packages/ai-prompts` – Prompt templates per agent.
- `packages/mcp-server` – MCP server exposing file/ticket tools.
- `packages/ui` – Shared React UI components.
- `lib/db` – MongoDB driver and memory store.
- `lib/schemas` – Pydantic schemas for all AI outputs.
- `lib/types` – TypeScript mirrors of the Pydantic schemas.
- `lib/tools` – Agent registry, tool registry, orchestration loop.

### Agents

- **PlannerAgent** – Produces a `PlanGraphSchema` from a raw idea.
- **ValidatorAgent** – Produces an `IdeaAnalysisSchema`.
- **ArchitectAgent** – Produces a `BlueprintSchema`.
- **FlowDesignerAgent** – Produces a `UserFlowSchema`.
- **TicketGeneratorAgent** – Produces a list of `KanbanTicketSchema`.
- **DevOpsAgent** – Uses MCP-style tools to generate files/components and adjust tickets.

The `Orchestrator` in `lib/tools/orchestrator.py` runs the default pipeline:

`idea → planner → validator → architect → flow → tickets → ProjectStateSchema`

### Backend routing

- `POST /agent/plan` – Planner agent (optionally full pipeline).
- `POST /agent/validate` – Validator.
- `POST /agent/architect` – Architect.
- `POST /agent/flow` – Flow designer.
- `POST /agent/tickets` – Ticket generator.

### MCP tools

The MCP server exposes:

- `createFile(path, content)`
- `updateFile(path, content)`
- `generateComponent(name)`
- `moveTicket(ticketId, status)`

These are intended to be wired to the DevOps agent or called directly from Cursor for automation.

