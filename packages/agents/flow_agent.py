from typing import Any, Dict

from lib.schemas.flow_schema import UserFlowSchema

from .groq_client import GroqClient
from .utils import load_prompt


class FlowDesignerAgent:
    """
    Produces React Flow–ready nodes and edges as UserFlowSchema.
    """

    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("flow_prompt.txt")

    async def design_flows(self, idea: str, blueprint_summary: str | None = None) -> UserFlowSchema:
        system_prompt = self.prompt_template

        user_content = (
            "You are the Flow Designer Agent. Given the SaaS idea (and optionally a short "
            "blueprint summary), produce a UserFlowSchema JSON object, suitable for React Flow.\n\n"
            f"IDEA:\n{idea}\n\n"
        )
        if blueprint_summary:
            user_content += f"BLUEPRINT_SUMMARY:\n{blueprint_summary}\n"

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]

        raw: Dict[str, Any] = await self.client.chat_json(
            messages, response_schema_name="UserFlowSchema"
        )
        return UserFlowSchema.model_validate(raw)

