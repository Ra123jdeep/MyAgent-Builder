from typing import Any, Dict
from lib.schemas.project_state import CriticOutput
from .groq_client import GroqClient
from .utils import load_prompt

class CriticAgent:
    """
    Anti-Vibe Analyst: Finds risks and security issues.
    """
    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("critic_prompt.txt")

    async def critique(self, plan: Any, architecture: Any, roadmap: Any) -> CriticOutput:
        system_prompt = self.prompt_template
        user_content = (
            f"PLAN:\n{plan}\n\n"
            f"ARCHITECTURE:\n{architecture}\n\n"
            f"ROADMAP:\n{roadmap}\n"
        )
        
        raw: Dict[str, Any] = await self.client.chat_json(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content},
            ],
            response_schema_name="CriticOutput"
        )
        return CriticOutput.model_validate(raw)
