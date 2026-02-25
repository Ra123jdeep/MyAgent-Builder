import os
import json
from typing import Any, Dict, List, Optional
from groq import Groq
import socket

# Force IPv4 for Groq client to fix network timeouts
old_getaddrinfo = socket.getaddrinfo
def new_getaddrinfo(*args, **kwargs):
    responses = old_getaddrinfo(*args, **kwargs)
    return [response for response in responses if response[0] == socket.AF_INET]
socket.getaddrinfo = new_getaddrinfo

# Default configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")


class GroqClient:
    """
    Groq client wrapper using the official Python SDK.
    """

    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None) -> None:
        self.api_key = api_key or GROQ_API_KEY
        self.model = model or GROQ_MODEL
        
        if not self.api_key:
            # We don't raise here to allow instantiation, but methods will fail if key is missing
            pass
            
        self.client = Groq(api_key=self.api_key)

    async def chat_json(
        self,
        messages: List[Dict[str, Any]],
        response_schema_name: str,
        temperature: float = 0.7,
    ) -> Dict[str, Any]:
        """
        Ask Groq to return strictly valid JSON.
        """
        if not self.api_key:
             raise RuntimeError("GROQ_API_KEY is not configured.")

        # Call Groq API via official SDK
        print(f"DEBUG: Calling Groq API... (Key length: {len(self.api_key) if self.api_key else 0})")
        try:
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                response_format={"type": "json_object"},
                temperature=temperature
            )
            print("DEBUG: Groq API returned response.")
        except Exception as e:
            print(f"DEBUG: Groq API Error: {e}")
            raise e

        content = completion.choices[0].message.content
        print(f"DEBUG: Content received (len: {len(content) if content else 0})")
        if not content:
            raise ValueError("Groq returned empty content")

        try:
            return json.loads(content)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"Groq did not return valid JSON for schema {response_schema_name}"
            ) from exc
