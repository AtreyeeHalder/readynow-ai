import { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I'm ReadyNow AI. Describe your emergency or preparedness question.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "Unable to connect to the backend.",
        },
      ]);

      console.error(error);
    }

    setLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="chat-box">

      <div className="messages">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
          >
            <strong>
              {message.sender === "user" ? "You" : "ReadyNow AI"}
            </strong>

            <p>{message.text}</p>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <strong>ReadyNow AI</strong>
            <p>Thinking...</p>
          </div>
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Describe your emergency..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;