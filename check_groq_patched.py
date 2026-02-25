import socket
import os
from dotenv import load_dotenv
from groq import Groq

# Force IPv4
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(f"Testing Groq SDK with IPv4 Patch... Key: {api_key[:4]}...")

try:
    client = Groq(api_key=api_key)
    print("✅ Groq Client initialized.")
    
    print("Sending test request (JSON Mode)...")
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a JSON generator. Output a JSON object with key 'message'."},
            {"role": "user", "content": "Hello"}
        ],
        response_format={"type": "json_object"},
        max_tokens=100
    )
    content = completion.choices[0].message.content
    print(f"✅ Response Content: {content}")
    import json
    data = json.loads(content)
    print(f"✅ Parsed JSON: {data}")

except Exception as e:
    print(f"❌ Failed: {e}")
