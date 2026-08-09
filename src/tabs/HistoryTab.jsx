import PastRounds from "../components/history/PastRounds.jsx";
import TabBtns from "../components/history/TabBtn.jsx";
function HistoryTab({ setIsAddingPlayers, setView }) {
  return (
    <>
      <title>Game History</title>
      <main
        aria-label="history-main"
        className="row-2 h-full w-full overflow-hidden"
      >
        <div className="grid h-full w-full grid-rows-[3rem_2rem_1fr] self-center justify-self-center overflow-hidden px-4">
          <h1 className="row-1 w-[90vw] text-center">HISTORY</h1>

          <TabBtns />

          <div className="row-3 flex h-full w-full grow flex-col items-start self-center justify-self-center overflow-hidden rounded-2xl bg-(--accent-bg) p-4">
            <PastRounds setIsAddingPlayers={setIsAddingPlayers} setView={setView} />
          </div>
        </div>
      </main>
    </>
  );
}

export default HistoryTab;
