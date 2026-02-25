from typing import Any, Dict
from lib.schemas.project_state import PlannerOutput
from .groq_client import GroqClient
from .utils import load_prompt

class PlannerAgent:
    """
    Vision Strategist: Reshapes idea into a product concept.
    """
    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("planner_prompt.txt")

    async def plan(self, idea: str) -> PlannerOutput:
        system_prompt = self.prompt_template
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"IDEA:\n{idea}"},
        ]

        raw: Dict[str, Any] = await self.client.chat_json(
            messages, response_schema_name="PlannerOutput"
        )
        return PlannerOutput.model_validate(raw)
