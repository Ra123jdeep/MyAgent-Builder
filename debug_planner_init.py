from packages.agents.planner_agent import PlannerAgent
import traceback
import os
from pathlib import Path

# Print current working directory
print(f"CWD: {os.getcwd()}")

try:
    print("Initializing PlannerAgent...")
    agent = PlannerAgent()
    print("✅ Success!")
    print(f"Prompt template length: {len(agent.prompt_template)}")
except Exception as e:
    print(f"❌ Failed: {e}")
    traceback.print_exc()

# Check file existence explicitly
try:
    base = Path("packages/agents/utils.py").resolve().parents[1] / "ai-prompts"
    prompt_path = base / "planner_prompt.txt"
    print(f"Checking path: {prompt_path}")
    print(f"Exists: {prompt_path.exists()}")
except Exception as e:
    print(f"Path logic error: {e}")
