import httpx
from prompts import SYSTEM_PROMPT

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma4:latest"


def generate_response(message: str) -> str:
    prompt = f"""
{SYSTEM_PROMPT}

User:
{message}

Assistant:
"""

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.2,
            "num_predict": 80,
        },
    }

    try:
        response = httpx.post(
            OLLAMA_URL,
            json=payload,
            timeout=300,
        )

        response.raise_for_status()

        return response.json()["response"]

    except Exception as e:
        return f"Backend error: {e}"