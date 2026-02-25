MyAgent Builder
================

MyAgent Builder is an AI-native development platform that turns a raw SaaS idea into a production-ready blueprint:

- structured product blueprint
- feature architecture
- user flow diagrams
- kanban development tickets
- Cursor AI + MCP automation-ready project structure

This repo is organized as a modular monorepo with a FastAPI backend, a Next.js 14 frontend, shared agent packages, and an MCP server for file/ticket automation.

## Monorepo layout

- `apps/web` – Next.js 14 App Router dashboard (TypeScript, Tailwind, shadcn/ui, React Flow, dnd-kit)
- `apps/api` – FastAPI backend (async, Pydantic, modular routers)
- `packages/agents` – Python agent implementations (Planner, Validator, Architect, Flow, Ticket, DevOps)
- `packages/ai-prompts` – Agent prompt templates
- `packages/mcp-server` – MCP server and tools (createFile, updateFile, generateComponent, moveTicket)
- `packages/ui` – Shared React UI components
- `lib/db` – MongoDB connection and memory store
- `lib/schemas` – Shared Pydantic schemas
- `lib/tools` – Orchestration, tool registry, agent registry
- `lib/types` – Shared TypeScript types
- `cursor` – Cursor rules and high-level architecture docs

## Prerequisites

- Node.js 20+
- Python 3.11+
- MongoDB Atlas (free tier) connection string
- Groq API key (for `llama-3.1-8b-instant`)

## Environment configuration

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Key variables:

- `GROQ_API_KEY` – Groq API key
- `MONGODB_URI` – MongoDB Atlas connection string
- `MONGODB_DB_NAME` – database name (e.g. `myagent_builder`)

## Backend (FastAPI)

Create and activate a virtual environment, then install dependencies:

```bash
cd "d:\MyAgent Builder"
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Run the API (from repo root) with `PYTHONPATH` set so FastAPI can import `lib` and `packages`:

```powershell
cd "d:\MyAgent Builder"
set PYTHONPATH=.
uvicorn apps.api.main:app --reload
```

FastAPI will expose the following core routes:

- `POST /agent/plan`
- `POST /agent/validate`
- `POST /agent/architect`
- `POST /agent/flow`
- `POST /agent/tickets`

Each route delegates to a dedicated agent and all AI responses are validated against Pydantic schemas (IdeaAnalysisSchema, BlueprintSchema, UserFlowSchema, KanbanTicketSchema, PlanGraphSchema, ProjectStateSchema).

## Frontend (Next.js 14)

```bash
cd "d:\MyAgent Builder\apps\web"
npm install
npm run dev
```

The dashboard includes:

- idea scoring and validation summary
- feature architecture view
- React Flow-based user flows
- dnd-kit Kanban board for tickets
- agent activity log

## MCP server

```bash
cd "d:\MyAgent Builder\packages\mcp-server"
npm install
npm run dev
```

The MCP server exposes tools:

- `createFile(path, content)`
- `updateFile(path, content)`
- `generateComponent(name)`
- `moveTicket(ticketId, status)`

Cursor AI can later be configured to connect to this MCP server to automate file creation and ticket management.

## Development philosophy

- Agent-first architecture with clear agent and tool registries
- Strongly typed JSON contracts via Pydantic and TypeScript
- Groq tool-calling integration with `llama-3.1-8b-instant`
- Modular, scalable monorepo that plays nicely with Cursor AI

