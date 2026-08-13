import { useState } from "react";
import TabBtns from "../components/history/TabBtns";
import Leaderboard from "../components/history/rankings/Leaderboard";

function RankingsTab() {
  const screens = {
    ROUNDS: "rounds",
    SESSIONS: "sessions",
  };
  const [activeTab, setActiveTab] = useState(screens.ROUNDS);

  return (
    <>
      <title>Rankings</title>
      <main
        aria-label="history-main"
        className="row-2 flex h-full w-full flex-col self-center justify-self-center overflow-hidden md:w-3xl"
      >
        <div className="grid h-full w-full grid-rows-[3rem_1fr] gap-y-4 self-center justify-self-center overflow-hidden px-8">
          {/* <h1 className="row-1 w-[90vw] text-center">HISTORY</h1> */}

          <TabBtns activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="overflow-hidden">
            <Leaderboard />
          </div>
        </div>
      </main>
    </>
  );
}

export default RankingsTab;
