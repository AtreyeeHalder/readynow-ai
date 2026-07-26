import { useRef } from "react";
import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import PlannerCard from "../components/PlannerCard";

function Home() {
  const chatRef = useRef();

  function sendPrompt(prompt) {
    chatRef.current.sendMessage(prompt);
  }

  return (
    <>
      <Navbar />

      <main className="container">

        <h1>ReadyNow AI</h1>

        <p>
        Offline disaster preparedness and emergency guidance powered by
        Gemma 4.
        </p>

        <p className="disclaimer">
        ReadyNow AI is an AI assistant and may not always provide perfect
        information. Always verify guidance with trusted emergency services,
        local authorities, and official safety resources.
        </p>

        <div className="card-grid">

          <PlannerCard
            title="🌎 Earthquake"
            description="Immediate earthquake guidance"
            onClick={() =>
              sendPrompt(
                "I'm experiencing an earthquake. Give immediate safety guidance."
              )
            }
          />

          <PlannerCard
            title="🌊 Flood"
            description="Flood safety recommendations"
            onClick={() =>
              sendPrompt(
                "I'm experiencing a flood. Give immediate safety guidance."
              )
            }
          />

          <PlannerCard
            title="🔥 Wildfire"
            description="Wildfire evacuation advice"
            onClick={() =>
              sendPrompt(
                "I'm near a wildfire. Give immediate safety guidance."
              )
            }
          />

        </div>

        <ChatBox ref={chatRef} />

      </main>
    </>
  );
}

export default Home;