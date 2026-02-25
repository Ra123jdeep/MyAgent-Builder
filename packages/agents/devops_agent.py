from typing import Callable, Dict, List, Protocol

from lib.schemas.blueprint import BlueprintSchema
from lib.schemas.ticket_schema import KanbanTicketSchema


class DevOpsToolInvoker(Protocol):
    """
    Abstract interface for calling DevOps tools.
    In production this can be wired to an MCP server.
    """

    async def create_file(self, path: str, content: str) -> None: ...

    async def update_file(self, path: str, content: str) -> None: ...

    async def generate_component(self, name: str) -> str: ...

    async def move_ticket(self, ticket_id: str, status: str) -> None: ...


class DevOpsAgent:
    """
    DevOps Agent responsible for generating the initial file structure and
    delegating concrete actions to MCP-style tools (createFile, updateFile,
    generateComponent, moveTicket).
    """

    def __init__(self, tool_invoker: DevOpsToolInvoker) -> None:
        self.tools = tool_invoker

    async def bootstrap_project(
        self,
        blueprint: BlueprintSchema,
        tickets: List[KanbanTicketSchema],
    ) -> Dict[str, str]:
        """
        Create a minimal project layout and one example UI component using
        the provided tools. Returns a summary map of created resources.
        """
        summary: Dict[str, str] = {}

        # Example: create a README snippet based on the product name.
        readme_content = f"# {blueprint.product_name}\n\n{blueprint.elevator_pitch}\n"
        await self.tools.create_file("README.generated.md", readme_content)
        summary["readme"] = "README.generated.md"

        # Example: generate a starter UI component name from product name.
        component_name = blueprint.product_name.replace(" ", "") + "Card"
        component_code = await self.tools.generate_component(component_name)
        await self.tools.create_file(
            f"packages/ui/{component_name}.tsx",
            component_code,
        )
        summary["component"] = component_name

        # Optionally move the first ticket into "in_progress" to bootstrap the board.
        if tickets:
            first_ticket = tickets[0]
            await self.tools.move_ticket(first_ticket.id, "in_progress")
            summary["moved_ticket"] = first_ticket.id

        return summary

