from typing import Awaitable, Callable, Dict


ToolFn = Callable[..., Awaitable[object]]


class ToolRegistry:
    """
    Simple in-memory tool registry keyed by tool name.
    """

    def __init__(self) -> None:
        self._tools: Dict[str, ToolFn] = {}

    def register(self, name: str, fn: ToolFn) -> None:
        self._tools[name] = fn

    def get(self, name: str) -> ToolFn:
        if name not in self._tools:
            raise KeyError(f"Tool '{name}' is not registered")
        return self._tools[name]

    def list_tools(self) -> Dict[str, str]:
        return {name: fn.__doc__ or "" for name, fn in self._tools.items()}


global_tool_registry = ToolRegistry()

