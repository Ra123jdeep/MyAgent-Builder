from typing import Any, Dict

from lib.schemas.idea_analysis import IdeaAnalysisSchema

from .groq_client import GroqClient
from .utils import load_prompt


class ValidatorAgent:
    """
    Evaluates the idea across market demand, feasibility, uniqueness,
    monetization, scalability, and complexity, returning IdeaAnalysisSchema.
    """

    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("validator_prompt.txt")

    async def validate(self, idea: str) -> IdeaAnalysisSchema:
        system_prompt = self.prompt_template

        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": (
                    "You are the Validator Agent. Given the SaaS idea text below, "
                    "produce an IdeaAnalysisSchema JSON object.\n\n"
                    f"IDEA:\n{idea}"
                ),
            },
        ]

        raw: Dict[str, Any] = await self.client.chat_json(
            messages, response_schema_name="IdeaAnalysisSchema"
        )
        return IdeaAnalysisSchema.model_validate(raw)

