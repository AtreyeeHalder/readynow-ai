import httpx
from prompts import SYSTEM_PROMPT

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "gemma4:latest"


def generate_response(messages) -> str:

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            }
        ]
        +
        [
            {
                "role": "user" if msg.sender == "user" else "assistant",
                "content": msg.text,
            }
            for msg in messages
        ],
        "stream": False,
        "think": False,
        "options": {
            "temperature": 0.1,
            "num_predict": 120,
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

        return data["message"]["content"].strip()

    except Exception as e:
        return f"Backend error: {e}"