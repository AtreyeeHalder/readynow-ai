import httpx
from prompts import SYSTEM_PROMPT

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "gemma4:latest"


def generate_response(message: str) -> str:

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": message,
            },
        ],
        "stream": False,
        "think": False,
        "options": {
            "temperature": 0.1,
            "num_predict": 100,
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

        data = response.json()

        text = data["message"]["content"].strip()

        if not text:
            return "Sorry, I couldn't generate guidance. Please try again."

        return text

    except Exception as e:
        return f"Backend error: {e}"