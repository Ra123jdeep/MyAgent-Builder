import asyncio
import os
import socket
from dotenv import load_dotenv

# Force IPv4
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

load_dotenv()

from packages.agents.planner_agent import PlannerAgent

async def test_planner():
    try:
        print("Initializing PlannerAgent...")
        agent = PlannerAgent()
        print("Running plan()...")
        result = await agent.plan("Test Project Idea")
        print(f"✅ Success! Vision: {result.vision}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_planner())
