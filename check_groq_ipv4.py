import socket
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Force IPv4
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

api_key = os.getenv("GROQ_API_KEY")
print(f"Testing Groq with IPv4... Key: {api_key[:4]}...")

try:
    resp = requests.get("https://api.groq.com/openai/v1/models", headers={"Authorization": f"Bearer {api_key}"}, timeout=10)
    print(f"Status: {resp.status_code}")
    print("Success!")
except Exception as e:
    print(f"Error: {e}")
