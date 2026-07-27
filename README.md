# ReadyNow AI

## Offline Disaster Preparedness Assistant Powered by Gemma 4

ReadyNow AI is an AI-powered emergency assistant designed to provide quick, practical disaster guidance when internet connectivity may be limited.

The application uses Google's **Gemma 4** model locally through Ollama (`gemma4:latest`), allowing users to interact with an offline AI assistant for emergency scenarios such as earthquakes, floods, and wildfires.

The goal is to provide accessible, privacy-focused emergency guidance without relying on external cloud AI services.

---

## Problem

During natural disasters, communication networks may become unreliable or unavailable. People may need immediate guidance while waiting for emergency responders or accessing official resources.

Traditional AI assistants often depend on cloud infrastructure, requiring a stable internet connection and sending user data to remote servers.

ReadyNow AI explores a different approach:

- Local AI inference
- Privacy-focused processing
- Offline-capable emergency assistance

---

## Solution

ReadyNow AI combines a React frontend, FastAPI backend, and locally running Gemma 4 model.

Users can:

- Ask emergency-related questions
- Receive short, actionable safety guidance
- Continue conversations with context from previous messages
- Quickly access common disaster scenarios through preset prompts

Supported scenarios:

- 🌎 Earthquakes
- 🌊 Floods
- 🔥 Wildfires

---

## Gemma 4 Integration

Gemma 4 is the core intelligence behind ReadyNow AI.

The project uses:

- **Gemma 4 local inference through Ollama**
- **System prompts** to enforce safety-focused responses
- **Conversation history** to maintain emergency context
- **Low-temperature generation** for more consistent guidance

Gemma receives structured messages:

```
System Prompt
      |
      v
Conversation History
      |
      v
User Emergency Situation
      |
      v
Gemma 4 Response
```

The model is instructed to:

- Prioritize immediate safety actions
- Recognize urgent situations
- Avoid unnecessary explanations
- Provide concise numbered steps

---

## Features

### Emergency Chat Assistant

Users can describe emergency situations and receive immediate guidance.

Example:

```
User:
I'm trapped under a fallen table after an earthquake

ReadyNow AI:
1. Stay still and protect yourself from falling debris.
2. Check your breathing and injuries.
3. Signal for help if possible.
```

---

### Disaster Quick Actions

The interface includes preset emergency categories:

- Earthquake guidance
- Flood safety recommendations
- Wildfire evacuation advice

These provide users with faster access to common emergency scenarios.

---

### Conversation Memory

ReadyNow AI maintains the current conversation context.

Example:

```
User:
I'm trapped under debris.

AI:
Are you injured?

User:
Yes, my leg is hurt.

AI:
Focus on protecting the injury and signaling for help.
```

The assistant can respond based on previous messages instead of treating every message as a new request.

---

### Responsible AI Disclaimer

ReadyNow AI is an AI assistant and may not always provide perfect information.

Users are encouraged to verify guidance with:

- Emergency services
- Local authorities
- Official safety resources

The application is designed to assist during emergencies, not replace trained responders.

---

## Architecture

```
                 React Frontend
                       |
                       |
                       v
                 FastAPI Backend
                       |
                       |
                       v
                 Ollama Runtime
                       |
                       |
                       v
                  Gemma 4 Model
```

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- HTTPX

### AI

- Google Gemma 4
- Ollama local inference

---

## Project Structure

```
readynow-ai/
│
├── README.md
│
├── backend/
│   ├── app.py
│   ├── gemma.py
│   ├── prompts.py
│   ├── schemas.py
│   └── requirements.txt
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        │
        ├── components/
        │   ├── ChatBox.jsx
        │   ├── Navbar.jsx
        │   └── PlannerCard.jsx
        │
        └── pages/
            └── Home.jsx
```

---

## Setup Instructions

### Requirements

Install:

- Python 3.10+
- Node.js
- Ollama

---

### 1. Clone Repository

```bash
git clone <repository-url>

cd readynow-ai
```

---

### 2. Setup Gemma 4

Install Ollama:

https://ollama.com

Download Gemma 4:

```bash
ollama pull gemma4
```

Verify:

```bash
ollama run gemma4:latest
```

Exit with:

```
/bye
```

---

### 3. Setup Backend

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

Windows:

```bash
python -m venv .venv
```

Activate:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 4. Setup Frontend

Open another terminal.

Navigate to frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Start React:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Running the Application

Three services must be running:

### Terminal 1

Ollama:

```bash
ollama run gemma4:latest
```

### Terminal 2

Backend:

```bash
cd backend
uvicorn app:app --reload
```

### Terminal 3

Frontend:

```bash
cd frontend
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Design Decisions

### Why Local AI?

Disaster situations can involve:

- Poor connectivity
- Privacy concerns
- Limited access to online services

Running Gemma 4 locally allows the application to continue functioning without depending on external AI APIs.

---

### Why Gemma 4?

Gemma 4 provides:

- Strong instruction following
- Local deployment support
- Reasoning capabilities
- Efficient inference options

These capabilities make it suitable for an offline emergency assistant prototype.

---

## Limitations

ReadyNow AI is a prototype.

Current limitations:

- Does not replace emergency responders
- Does not provide live emergency alerts
- Does not access location data
- Does not guarantee medically or legally authoritative advice

Future improvements could include:

- Disaster image analysis using Gemma vision capabilities
- Offline emergency manuals
- Location-aware emergency resources
- Integration with official alert systems

---

## Track Alignment

## Edge / On-Device Track

ReadyNow AI demonstrates local AI inference using Gemma 4, enabling privacy-focused emergency assistance without requiring cloud-based AI services.

---

## Live Demo

Demo Video Link (Google Drive): https://drive.google.com/file/d/1BrH6nslqEmuEixN5xX7H8uX_3YZMc8LC/view?usp=sharing

Note: No audio due to technical difficulties