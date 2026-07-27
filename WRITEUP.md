# ReadyNow AI: Offline Disaster Preparedness Assistant Powered by Gemma 4

## An AI emergency companion providing fast, practical disaster guidance using a locally deployed Gemma 4 model

## Overview

During emergencies, people often need immediate guidance but may face unreliable internet access, overloaded emergency websites, or difficulty processing large amounts of information under stress.

ReadyNow AI is an offline disaster preparedness assistant designed to provide concise, actionable emergency guidance through a conversational interface. The application uses Google's Gemma 4 model running locally through Ollama, allowing responses to be generated without relying on external AI APIs.

The goal of this project was to build a lightweight AI assistant that prioritizes safety, understands emergency context, and provides practical next steps for situations such as earthquakes, floods, and wildfires.

The project was built as a full-stack application with:

- React frontend for user interaction
- FastAPI backend for API communication
- Ollama for local model inference
- Gemma 4 as the underlying AI model

---

## Architecture

ReadyNow AI follows a simple client-server architecture:

```
React Frontend
      |
      |
      ↓
FastAPI Backend
      |
      |
      ↓
Ollama Local API
      |
      |
      ↓
Gemma 4 Model
```


## Frontend

The frontend was built using React and Vite.

It provides:

- A conversational chat interface
- Emergency scenario shortcuts:
  - Earthquake
  - Flood
  - Wildfire
- Real-time interaction with the AI assistant

Users can either select a predefined emergency scenario or describe their own situation.

The frontend maintains conversation history and sends the complete conversation to the backend, allowing Gemma 4 to respond with awareness of previous messages.

---

## Backend

The backend uses FastAPI to handle communication between the frontend and the local AI model.

Main responsibilities:

- Receive user messages
- Maintain conversation context
- Construct structured prompts
- Send requests to Ollama
- Return generated responses

The `/chat` endpoint accepts conversation history:

```json
{
  "messages": [
    {
      "sender": "user",
      "text": "I am trapped after an earthquake"
    }
  ]
}
```

The backend converts this into Gemma 4's expected chat format:

```python
[
    {
        "role": "system",
        "content": SYSTEM_PROMPT
    },
    {
        "role": "user",
        "content": user_message
    }
]
```

## How Gemma 4 Was Used

Gemma 4 is the core intelligence behind ReadyNow AI.

The model is deployed locally using Ollama:

```
ollama run gemma4:latest
```

The application communicates with Ollama's local API:

```
http://localhost:11434/api/chat
```

Rather than using a cloud AI service, this approach keeps inference local, improving:

- Privacy
- Availability during internet outages
- Control over model behavior
- Cost efficiency

The model receives a custom system prompt designed specifically for emergency assistance.

Example:

```
You are ReadyNow AI, an offline emergency assistant.

Your job is to provide immediate, practical safety guidance during disasters.

Rules:
- Prioritize human safety.
- Give instructions that can be followed immediately.
- Do not provide reasoning.
- Use 3-5 short numbered steps.
```

This prompt engineering ensures that responses are:

- Short enough to read during stressful situations
- Action-oriented
- Focused on immediate safety decisions
- Technical Decisions

## Why use a local model instead of an API?

A traditional chatbot API would introduce several limitations:

- Requires internet connectivity
- Sends potentially sensitive emergency conversations externally
- Creates dependency on third-party availability

Running Gemma 4 locally through Ollama allows ReadyNow AI to continue functioning even in environments where connectivity may be limited.

## Why FastAPI?

FastAPI was chosen because it provides:

- Lightweight REST API development
- Easy integration with Python AI tooling
- Automatic request validation through Pydantic
- Fast communication with the frontend

## Why React?

React allows the application to provide a more usable emergency interface than a command-line tool.

Emergency assistance requires:

- Clear presentation
- Simple interactions
- Immediate access to common scenarios

The card-based interface reduces the amount of typing required during stressful situations.

## Challenges During Development

1. Controlling AI Response Length

    One challenge was preventing the model from producing long explanations.

    Emergency situations require short instructions, not essays.

    To solve this, multiple controls were combined:

    **Prompt constraints**

    The system prompt instructs Gemma 4 to:

    - Use numbered steps
    - Avoid explanations
    - Prioritize immediate actions

    **Generation parameters**

    The Ollama request limits output:

    ```
    "options": {
        "temperature": 0.1,
        "num_predict": 120
    }
    ```

    This reduces unnecessary generation while maintaining useful responses.

2. Maintaining Conversation Context

    The initial implementation only sent the latest user message, which caused follow-up questions to lose context.

    The solution was changing the backend API design to send the complete conversation history on every request.

    This allows Gemma 4 to understand:

    - Previous emergency details
    - User condition
    - Follow-up questions

3. Reducing Unsafe Generic Responses

    General disaster advice is not always appropriate.

    A trapped survivor requires different instructions than someone preparing before a storm.

    The prompt was improved to include scenario-specific behavior:

    - Avoid unnecessary movement for trapped users
    - Prioritize breathing and injury protection
    - Ask relevant follow-up questions

    This makes responses more situation-aware.

    Current Features

    ReadyNow AI currently supports:

    ✅ Local Gemma 4 inference
    ✅ Conversational emergency assistance
    ✅ Earthquake guidance
    ✅ Flood guidance
    ✅ Wildfire guidance
    ✅ Conversation memory
    ✅ Safety-focused prompting
    ✅ Offline AI deployment through Ollama

## Future Improvements

Future versions could include:

- Location-aware emergency alerts
- Integration with official emergency APIs
- Voice interaction for hands-free usage
- Image analysis for damage assessment using Gemma multimodal capabilities
- Offline mobile deployment
- Emergency resource lookup

## Impact

ReadyNow AI demonstrates how small, locally deployed language models can provide useful assistance in situations where speed, privacy, and availability matter.

While AI should not replace emergency professionals or official authorities, it can serve as an additional tool that helps users quickly access structured safety information when they need it most.

## Links

Source Code Repository:
https://github.com/AtreyeeHalder/readynow-ai

Live Demo:
https://drive.google.com/file/d/1BrH6nslqEmuEixN5xX7H8uX_3YZMc8LC/view?usp=sharing

Track: The Edge / On-Device Track