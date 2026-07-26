import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import UploadCard from "../components/UploadCard";
import PlannerCard from "../components/PlannerCard";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <ChatBox />
        <UploadCard />
        <PlannerCard />
      </main>
    </>
  );
}

export default Home;