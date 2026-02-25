import socket
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# Force IPv4
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

uri = os.getenv("MONGODB_URI")
print(f"Testing MongoDB with IPv4...")

async def test_connection():
    try:
        client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=5000)
        print("Attempting to connect...")
        await client.admin.command("ping")
        print("✅ MongoDB connected successfully with IPv4!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
