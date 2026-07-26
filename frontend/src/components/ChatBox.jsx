import {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const ChatBox = forwardRef(function ChatBox(props, ref) {

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I'm ReadyNow AI.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  async function sendMessage(userMessage) {

    if (!userMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          sender: "assistant",
          text: data.response,
        },
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "assistant",
          text: "Unable to connect.",
        },
      ]);

    }

    setLoading(false);

    setInput("");

  }

  useImperativeHandle(ref, () => ({
    sendMessage,
  }));

  return (
    <div className="chat-box">

      <div className="messages">

        {messages.map((message, index) => (

          <div
            key={index}
            className="message"
          >

            <strong>

              {message.sender === "assistant"
                ? "ReadyNow AI"
                : "You"}

            </strong>

            <p>{message.text}</p>

          </div>

        ))}

        {loading && <p>Analyzing emergency...</p>}

      </div>

      <div className="chat-input">

        <input
          value={input}
          placeholder="Describe your situation..."
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(input);
            }
          }}
        />

        <button
          onClick={() => sendMessage(input)}
        >
          Send
        </button>

      </div>

    </div>
  );

});

export default ChatBox;