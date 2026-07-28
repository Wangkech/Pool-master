import GamesCountTracker from "./GamesCountTracker";
import PlayerManagementBtns from "./PlayerManagementBtns";

function TopRowContainer({
  plusIcon,
  deleteIcon,
  disableIcon,
  // setIsAddingPlayers,
  addMorePlayers,
}) {
  return (
    <div className="active-game-top-row flex h-full items-center justify-between p-2">
      <PlayerManagementBtns
        plusIcon={plusIcon}
        deleteIcon={deleteIcon}
        disableIcon={disableIcon}
        // setIsAddingPlayers={setIsAddingPlayers}
        addMorePlayers={addMorePlayers}
      />
      <GamesCountTracker />
    </div>
  );
}

export default TopRowContainer;
