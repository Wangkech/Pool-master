import GamesCountTracker from "./GamesCountTracker";
import PlayerManagementBtns from "./PlayerManagementBtns";

function TopRowContainer({
  roundNumber,
  setShowDeletePlayer,
  setAdditionType,
  setIsAddingPlayers,
  showDeletePlayer,
  mode,
}) {
  return (
    <div className="active-game-top-row flex h-full items-center justify-between gap-x-12 p-2">
      <PlayerManagementBtns
        setAdditionType={setAdditionType}
        showDeletePlayer={showDeletePlayer}
        setIsAddingPlayers={setIsAddingPlayers}
        setShowDeletePlayer={setShowDeletePlayer}
      />
      <p>{mode}</p>
      <GamesCountTracker roundNumber={roundNumber} />
    </div>
  );
}

export default TopRowContainer;
