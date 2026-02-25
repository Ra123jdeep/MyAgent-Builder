import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

# Simulate the patch in main.py
import socket
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

# Import the actual library
try:
    from lib.db.mongo import get_client
    print("Successfully imported get_client")
except ImportError as e:
    print(f"ImportError: {e}")
    exit(1)

async def test_lib_connection():
    try:
        print("Getting client from lib...")
        client = get_client()
        print(f"Client created: {client}")
        print("Pinging...")
        await client.admin.command("ping")
        print("✅ Lib connection successful!")
    except Exception as e:
        print(f"❌ Lib connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_lib_connection())
