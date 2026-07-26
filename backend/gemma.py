import httpx

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma4:latest"


def generate_response(message: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": message,
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
            timeout=120,
        )

        response.raise_for_status()

        data = response.json()

        return data["response"]

    except Exception as e:
        return f"Backend error: {e}"