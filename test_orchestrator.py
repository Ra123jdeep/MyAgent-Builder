import asyncio
import os
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

from lib.tools.orchestrator import Orchestrator

async def test_pipeline():
    print("🚀 Starting Orchestrator Test...")
    orchestrator = Orchestrator()
    idea = "A task management app for AI agents"
    
    print(f"📝 Processing idea: {idea}")
    
    try:
        # Test just the planner first
        print("\n--- Testing Planner Agent ---")
        planner_result = await orchestrator.planner.plan(idea)
        print("✅ Planner Result:", planner_result.model_dump_json(indent=2))
        
        # Test full pipeline
        print("\n--- Testing Full Pipeline ---")
        # We can't easily test the full pipeline partially without mocking, 
        # so let's try running the orchestrator.run() which does everything.
        # Note: This might cost money/tokens, but we need to verify.
        
        project_state = await orchestrator.run(idea)
        print("✅ Full Pipeline Success!")
        print("Project ID:", project_state.project_id)
        
    except Exception as e:
        print(f"\n❌ Pipeline Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_pipeline())
