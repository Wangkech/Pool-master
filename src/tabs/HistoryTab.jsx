import { useState } from "react";

import PastRounds from "../components/history/PastRounds.jsx";
import TabBtns from "../components/history/TabBtns.jsx";
function HistoryTab({ setIsAddingPlayers, setView }) {
  const [activeTab, setActiveTab] = useState("round");

  return (
    <>
      <title>Game History</title>
      <main
        aria-label="history-main"
        className="row-2 h-full w-full overflow-hidden"
      >
        <div className="grid h-full w-full grid-rows-[3rem_1fr] gap-y-4 self-center justify-self-center overflow-hidden px-4">
          {/* <h1 className="row-1 w-[90vw] text-center">HISTORY</h1> */}

          <TabBtns activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "round" && (
            <div className="row-2 flex h-full w-full grow flex-col items-start self-center justify-self-center overflow-hidden rounded-2xl bg-(--accent-bg) p-4">
              <PastRounds
                setIsAddingPlayers={setIsAddingPlayers}
                setView={setView}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default HistoryTab;
