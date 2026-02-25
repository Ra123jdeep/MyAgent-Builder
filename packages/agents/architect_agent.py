from typing import Any, Dict
from lib.schemas.project_state import ArchitectOutput
from .groq_client import GroqClient
from .utils import load_prompt

class ArchitectAgent:
    """
    System Designer: Creates tech stack and schema.
    """
    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("architect_prompt.txt")

    async def architect(self, features: Any) -> ArchitectOutput:
        system_prompt = self.prompt_template
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"FEATURES:\n{features}"},
        ]

        raw: Dict[str, Any] = await self.client.chat_json(
            messages, response_schema_name="ArchitectOutput"
        )
        return ArchitectOutput.model_validate(raw)
