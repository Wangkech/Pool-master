import { useGameContext } from "../../context/useGameContext";

function BottomRowContainer() {
  const { startNewRound, endSession } = useGameContext();
  return (
    <div className="flex items-center justify-around">
      <button
        onClick={() => endSession()}
        className="rounded-2xl bg-black p-2 px-4"
      >
        End Session
      </button>
      <button
        onClick={() => startNewRound()}
        className="rounded-2xl bg-white px-4 py-2 text-black"
      >
        Next Round
      </button>
    </div>
  );
}

export default BottomRowContainer;
