from pathlib import Path


def load_prompt(name: str) -> str:
    """
    Load a prompt template from packages/ai-prompts.
    """
    base = Path(__file__).resolve().parents[1] / "ai-prompts"
    path = base / name
    return path.read_text(encoding="utf-8")

