import urllib.request
import json

print("Checking backend health...")
try:
    with urllib.request.urlopen("http://localhost:8000/health", timeout=5) as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            print(f"✅ Backend is healthy: {data}")
        else:
            print(f"❌ Backend returned status code: {response.status}")
except Exception as e:
    print(f"❌ Could not connect to backend: {e}")
