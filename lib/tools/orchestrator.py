from lib.db.memory_store import save_project_state
from lib.schemas.project_state import ProjectStateSchema

# New Agents
from packages.agents.planner_agent import PlannerAgent
from packages.agents.architect_agent import ArchitectAgent
from packages.agents.builder_agent import BuilderAgent
from packages.agents.critic_agent import CriticAgent
from packages.agents.experience_agent import ExperienceAgent


class Orchestrator:
    """
    ULTRA-NEXT AI Build Studio Orchestration Loop:
    Planner -> Architect -> Builder -> Critic -> Experience
    """

    def __init__(self) -> None:
        self.planner = PlannerAgent()
        self.architect = ArchitectAgent()
        self.builder = BuilderAgent()
        self.critic = CriticAgent()
        self.experience = ExperienceAgent()

    async def run(self, idea: str) -> ProjectStateSchema:
        import asyncio

        # 1. Planner (Vision Strategist)
        # This must run first to establish the vision
        planner_result = await self.planner.plan(idea)

        # Optimization: Run independent branches in parallel
        # Branch A: Technical Execution (Architect -> Builder -> Critic)
        # Branch B: User Experience (Experience)

        async def run_tech_branch():
            # 2. Architect
            architect_res = await self.architect.architect(features=planner_result.features)
            
            # 3. Builder
            builder_res = await self.builder.build(
                architect_result=architect_res, 
                features=planner_result.features
            )
            
            # 4. Critic
            critic_res = await self.critic.critique(
                plan=planner_result, 
                architecture=architect_res, 
                roadmap=builder_res.roadmap
            )
            return architect_res, builder_res, critic_res

        async def run_ux_branch():
            # 5. Experience
            return await self.experience.design(plan=planner_result)

        # Execute branches concurrently
        (architect_result, builder_result, critic_result), experience_result = await asyncio.gather(
            run_tech_branch(),
            run_ux_branch()
        )

        # Generate initial Kanban Tickets from Builder Roadmap
        tickets = []
        if builder_result and hasattr(builder_result, 'roadmap'):
            for phase_index, phase in enumerate(builder_result.roadmap):
                for step_index, step in enumerate(phase.get("steps", [])):
                    status = "backlog"
                    if phase_index == 0:
                        status = "done"
                    elif phase_index == 1:
                        status = "in_progress"
                        
                    from lib.schemas.project_state import Ticket
                    tickets.append(Ticket(
                        id=f"ticket-{phase_index}-{step_index}",
                        title=step,
                        status=status
                    ))

        # Aggregate Result
        project_state = ProjectStateSchema(
            idea=idea,
            planner_result=planner_result,
            architect_result=architect_result,
            builder_result=builder_result,
            critic_result=critic_result,
            experience_result=experience_result,
            tickets=tickets,
        )

        project_id = await save_project_state(project_state)
        project_state.project_id = project_id
        return project_state
