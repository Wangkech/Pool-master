import { useGameContext } from "../../context/useGameContext";
import { useDialog } from "../../context/useDialog";

function BottomRowContainer({
  setAdditionType,
  setGameOn,
  setActiveTab,
  setView,
  setIsAddingPlayers,
}) {
  const { startNewRound, endSession } = useGameContext();
  const { confirm } = useDialog();

  const viewHistory = async () => {
    await setView("history");
  };
  const handleEndSession = async () => {
    const confirmed = await confirm({
      title: "End Session?",
      message:
        "Are you sure you want to end this session? The session will be saved to history.",
      confirmText: "End Session",
      cancelText: "Continue Playing",
      isDangerous: true,
    });

    if (confirmed) {
      endSession();
      setAdditionType("regular");
      setGameOn(false);
      setIsAddingPlayers(false);
      setView("history");
      viewHistory().then(setActiveTab("sessions"));
    }
  };

  return (
    <div className="flex items-center justify-around">
      <button
        onClick={handleEndSession}
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
