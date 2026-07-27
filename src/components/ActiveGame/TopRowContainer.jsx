import GamesCountTracker from "./GamesCountTracker";
import PlayerManagementBtns from "./PlayerManagementBtns";

function TopRowContainer({ plusIcon, deleteIcon, disableIcon }) {
  return (
    <div className="active-game-top-row flex h-full items-center justify-between p-2">
      <PlayerManagementBtns
        plusIcon={plusIcon}
        deleteIcon={deleteIcon}
        disableIcon={disableIcon}
      />
      <GamesCountTracker />
    </div>
  );
}

export default TopRowContainer;
