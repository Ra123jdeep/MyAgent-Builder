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

from packages.agents.validator_agent import ValidatorAgent
from lib.schemas.idea_analysis import IdeaAnalysisSchema

async def test_validator():
    try:
        print("Initializing ValidatorAgent...")
        agent = ValidatorAgent()
        print("Running validate()...")
        idea = "A gamified habit tracking app for software engineers"
        
        # Test raw groq call without pydantic validation first
        system_prompt = agent.prompt_template
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

        print("Calling Groq API...")
        raw = await agent.client.chat_json(
            messages, response_schema_name="IdeaAnalysisSchema"
        )
        print("Raw Groq Output:")
        print(raw)
        
        print("\nAttempting Pydantic Validation...")
        result = IdeaAnalysisSchema.model_validate(raw)
        print(f"✅ Success! Score: {result.overall_score}")
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_validator())
