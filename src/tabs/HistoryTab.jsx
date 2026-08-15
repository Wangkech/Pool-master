import TabBtns from "../components/history/TabBtns.jsx";
import PastSessions from "../components/history/pastSessions/PastSessions";
import PastRounds from "../components/history/pastRounds/PastRounds.jsx";
import { useGameContext } from "../context/useGameContext.js";
function HistoryTab({
  setIsAddingPlayers,
  screens,
  activeTab,
  setActiveTab,
  setView,
}) {
  const { pastRounds } = useGameContext();
  return (
    <>
      <title>Game History</title>
      <main
        aria-label="history-main"
        className="row-2 flex h-full w-full flex-col self-center justify-self-center overflow-hidden md:w-3xl"
      >
        <div className="grid h-full w-full grid-rows-[3rem_1fr] gap-y-4 self-center justify-self-center overflow-hidden px-4">
          {/* <h1 className="row-1 w-[90vw] text-center">HISTORY</h1> */}

          <TabBtns activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === screens.ROUNDS && (
            <div
              className={`row-2 flex h-full w-full grow flex-col items-start self-center justify-self-center overflow-hidden rounded-2xl bg-(--accent-bg) p-4 ${pastRounds.length === 0 && "bg-(--primary-bg)"}`}
            >
              <PastRounds
                setIsAddingPlayers={setIsAddingPlayers}
                setView={setView}
              />
            </div>
          )}
          {activeTab === screens.SESSIONS && <PastSessions />}
        </div>
      </main>
    </>
  );
}

export default HistoryTab;
