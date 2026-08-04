import {
  faCancel,
  // faHome,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PlayerManagementBtns({ setIsAddingPlayers }) {
  return (
    <div className="active-game-action-btns grid max-w-25 grid-cols-3 items-center justify-center gap-x-1">
      <button
        className="active-game-action-btn add-more-player-btn px-2"
        onClick={() => setIsAddingPlayers(true)}
      >
        <FontAwesomeIcon icon={faUserPlus} className="" />
        {/* <FontAwesomeIcon icon={faUserPlus} /> */}

        {/* <img className="h-6" src={plusIcon} alt="Add More Player" /> */}
      </button>
      <button className="active-game-action-btn delete-player-btn px-2">
        <FontAwesomeIcon icon={faCancel} />
        {/* <img className="h-6" src={deleteIcon} alt="Delete-player" /> */}
      </button>
      <button className="active-game-action-btn px-2">
        <FontAwesomeIcon icon={faTrash} />
        {/* <img className="h-6" src={disableIcon} alt="Disable-player-btn" /> */}
      </button>
    </div>
  );
}

export default PlayerManagementBtns;
