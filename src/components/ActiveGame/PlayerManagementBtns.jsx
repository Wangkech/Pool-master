function PlayerManagementBtns({ plusIcon, deleteIcon, disableIcon }) {
  return (
    <div className="active-game-action-btns flex w-[40%] items-center justify-around">
      <button className="active-game-action-btn add-more-player-btn h-10">
        <img className="h-6" src={plusIcon} alt="Add More Player" />
      </button>
      <button className="active-game-action-btn delete-player-btn h-10">
        <img className="h-6" src={deleteIcon} alt="Delete-player" />
      </button>
      <button className="active-game-action-btn h-10">
        <img className="h-6" src={disableIcon} alt="Disable-player-btn" />
      </button>
    </div>
  );
}

export default PlayerManagementBtns;
