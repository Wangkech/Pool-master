import GamesCountTracker from "./GamesCountTracker";
import PlayerManagementBtns from "./PlayerManagementBtns";

function TopRowContainer({
  roundNumber,
  setShowDeletePlayer,
  setIsAddingPlayers,
  showDeletePlayer,
}) {
  return (
    <div className="active-game-top-row flex h-full items-center justify-between gap-x-12 p-2">
      <PlayerManagementBtns
        showDeletePlayer={showDeletePlayer}
        setIsAddingPlayers={setIsAddingPlayers}
        setShowDeletePlayer={setShowDeletePlayer}
      />
      <GamesCountTracker roundNumber={roundNumber} />
    </div>
  );
}

export default TopRowContainer;
