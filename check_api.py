import urllib.request
import json
import urllib.error

url = "http://localhost:8000/agent/plan"
payload = {
    "idea": "A simple test project",
    "full_pipeline": False
}
data = json.dumps(payload).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0'
})

try:
    print(f"Testing POST {url}...")
    with urllib.request.urlopen(req, timeout=30) as response:
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {response.read().decode('utf-8')[:200]}...")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    print(e.read().decode('utf-8'))
except urllib.error.URLError as e:
    print(f"URL Error: {e.reason}")
except Exception as e:
    print(f"Error: {e}")
