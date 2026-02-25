from typing import Any, Dict, List

from lib.schemas.ticket_schema import KanbanTicketSchema

from .groq_client import GroqClient
from .utils import load_prompt


class TicketGeneratorAgent:
    """
    Converts features and flows into developer-ready Kanban tickets.
    """

    def __init__(self) -> None:
        self.client = GroqClient()
        self.prompt_template = load_prompt("ticket_prompt.txt")

    async def generate_tickets(
        self,
        idea: str,
        feature_summaries: List[str],
    ) -> List[KanbanTicketSchema]:
        system_prompt = self.prompt_template

        feature_block = "\n".join(f"- {f}" for f in feature_summaries)
        user_content = (
            "You are the Ticket Generator Agent. Convert the following SaaS idea and feature list "
            "into a Kanban backlog. Return a JSON object with a `tickets` array of KanbanTicketSchema.\n\n"
            f"IDEA:\n{idea}\n\n"
            f"FEATURES:\n{feature_block}\n"
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]

        raw: Dict[str, Any] = await self.client.chat_json(
            messages, response_schema_name="KanbanTicketSchemaList"
        )

        # Expecting {"tickets": [ ... ]}
        tickets_raw = raw.get("tickets", [])
        return [KanbanTicketSchema.model_validate(t) for t in tickets_raw]

