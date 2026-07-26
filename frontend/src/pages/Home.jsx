import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";

function Home() {
  return (
    <>
      <Navbar />

      <main className="container">

        <h1>ReadyNow AI</h1>

        <p>
          Offline AI disaster preparedness and emergency assistant
        </p>

        <ChatBox />

      </main>
    </>
  );
}

export default Home;