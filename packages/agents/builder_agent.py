from typing import Any, Dict
from lib.schemas.project_state import BuilderOutput
from .groq_client import GroqClient
from .utils import load_prompt

class BuilderAgent:
    """
    Execution Engineer: Creates roadmap and structure.
    """
    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("builder_prompt.txt")

    async def build(self, architect_result: Any, features: Any) -> BuilderOutput:
        system_prompt = self.prompt_template
        user_content = (
            f"ARCHITECT PLAN:\n{architect_result}\n\n"
            f"FEATURES:\n{features}\n"
        )
        
        raw: Dict[str, Any] = await self.client.chat_json(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content},
            ],
            response_schema_name="BuilderOutput"
        )
        return BuilderOutput.model_validate(raw)
