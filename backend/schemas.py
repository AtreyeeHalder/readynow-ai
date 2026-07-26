from pydantic import BaseModel
from typing import List


class Message(BaseModel):
    sender: str
    text: str


class ChatRequest(BaseModel):
    messages: List[Message]