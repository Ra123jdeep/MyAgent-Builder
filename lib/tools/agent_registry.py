from typing import Dict, Literal

from packages.agents.architect_agent import ArchitectAgent
from packages.agents.devops_agent import DevOpsAgent, DevOpsToolInvoker
from packages.agents.flow_agent import FlowDesignerAgent
from packages.agents.planner_agent import PlannerAgent
from packages.agents.ticket_agent import TicketGeneratorAgent
from packages.agents.validator_agent import ValidatorAgent


AgentName = Literal[
    "planner",
    "validator",
    "architect",
    "flow",
    "tickets",
    "devops",
]


class AgentRegistry:
    """
    Central registry for agent instances.
    """

    def __init__(self, devops_tool_invoker: DevOpsToolInvoker) -> None:
        self._agents: Dict[AgentName, object] = {
            "planner": PlannerAgent(),
            "validator": ValidatorAgent(),
            "architect": ArchitectAgent(),
            "flow": FlowDesignerAgent(),
            "tickets": TicketGeneratorAgent(),
            "devops": DevOpsAgent(devops_tool_invoker),
        }

    def get(self, name: AgentName) -> object:
        return self._agents[name]


def create_agent_registry(devops_tool_invoker: DevOpsToolInvoker) -> AgentRegistry:
    return AgentRegistry(devops_tool_invoker)

