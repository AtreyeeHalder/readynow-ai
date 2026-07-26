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
        "enable_thinking": False,
        "options": {
            "temperature": 0.1,
            "num_predict": 200,
            "top_k": 20,
            "top_p": 0.8,
        },
    }

    try:
        response = httpx.post(
            OLLAMA_URL,
            json=payload,
            timeout=300,
        )

        response.raise_for_status()

        text = response.json().get("response", "").strip()

        if not text:
            return "Sorry, I couldn't generate guidance. Please try again."

        return text

    except Exception as e:
        return f"Backend error: {e}"