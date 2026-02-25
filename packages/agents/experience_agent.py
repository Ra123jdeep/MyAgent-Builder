from typing import Any, Dict
from lib.schemas.project_state import ExperienceOutput
from .groq_client import GroqClient
from .utils import load_prompt

class ExperienceAgent:
    """
    Product Designer: Defines UI/UX and branding.
    """
    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("experience_prompt.txt")

    async def design(self, plan: Any) -> ExperienceOutput:
        system_prompt = self.prompt_template
        user_content = (
            f"PLAN:\n{plan}\n"
        )
        
        raw: Dict[str, Any] = await self.client.chat_json(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content},
            ],
            response_schema_name="ExperienceOutput"
        )
        return ExperienceOutput.model_validate(raw)
