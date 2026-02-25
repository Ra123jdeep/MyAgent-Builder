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

from packages.agents.ticket_agent import TicketGeneratorAgent
from lib.schemas.ticket_schema import KanbanTicketSchema

async def test_tickets():
    try:
        print("Initializing TicketGeneratorAgent...")
        agent = TicketGeneratorAgent()
        print("Running generate_tickets()...")
        idea = "A gamified habit tracking app for software engineers"
        features = ["User Authentication", "Gamified Dashboard"]
        
        # Test raw groq call without pydantic validation first
        system_prompt = agent.prompt_template
        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"IDEA:\n{idea}\n\nFEATURES:\n{features}"
            },
        ]

        print("Calling Groq API...")
        raw = await agent.client.chat_json(
            messages, response_schema_name="KanbanTicketSchema"
        )
        print("Raw Groq Output:")
        import json
        print(json.dumps(raw, indent=2))
        
        print("\nAttempting Pydantic Validation...")
        # Note: Depending on whether raw is a list or a dict containing a list, this could fail
        if isinstance(raw, list):
            result = [KanbanTicketSchema.model_validate(t) for t in raw]
            print(f"✅ Success! Number of Tickets: {len(result)}")
        elif isinstance(raw, dict) and "tickets" in raw:
            result = [KanbanTicketSchema.model_validate(t) for t in raw["tickets"]]
            print(f"✅ Success! Number of Tickets: {len(result)}")
        else:
            print("❌ Unexpected raw structure:", type(raw))
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_tickets())
