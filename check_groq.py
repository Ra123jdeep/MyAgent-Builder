import os
from dotenv import load_dotenv
from groq import Groq

# Load .env
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(f"Loaded API Key: {api_key[:4]}...{api_key[-4:] if api_key and len(api_key) > 8 else 'None'}")

if not api_key or "your-groq-api-key" in api_key:
    print("❌ Error: GROQ_API_KEY is not set or is using the placeholder.")
    exit(1)

try:
    client = Groq(api_key=api_key)
    print("✅ Groq Client initialized.")
    
    print("Sending test request to llama-3.3-70b-versatile...")
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a test assistant."},
            {"role": "user", "content": "Hello, are you working?"}
        ],
        temperature=0.7,
        max_tokens=50
    )
    print(f"✅ Response received: {completion.choices[0].message.content}")

except Exception as e:
    print(f"❌ Connection failed: {e}")
