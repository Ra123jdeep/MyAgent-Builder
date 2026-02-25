import socket
import urllib.request
import urllib.error
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
print(f"Testing Groq with IPv4 (urllib)... Key: {api_key[:4]}...")

url = "https://api.groq.com/openai/v1/models"
req = urllib.request.Request(url, headers={"Authorization": f"Bearer {api_key}"})

try:
    with urllib.request.urlopen(req, timeout=10) as response:
        print(f"Status: {response.getcode()}")
        print("Success!")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
except Exception as e:
    print(f"Error: {e}")
