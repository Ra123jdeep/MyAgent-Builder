# Cursor rules for MyAgent Builder

- Always generate TypeScript in the frontend (`apps/web`) and shared UI (`packages/ui`).
- Use FastAPI with async endpoints and Pydantic models for the backend (`apps/api`).
- All AI agent outputs must conform to the Pydantic schemas in `lib/schemas`.
- Prefer importing shared TypeScript types from `lib/types/schemas.ts` in the frontend.
- Never create files outside the existing monorepo layout (`apps`, `packages`, `lib`, `cursor`).
- Prefer adding new backend routes under `apps/api/routers` and corresponding services under `apps/api/services`.
- When adding new agents, place them under `packages/agents` and prompts under `packages/ai-prompts`.

