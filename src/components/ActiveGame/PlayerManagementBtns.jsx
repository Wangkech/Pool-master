function PlayerManagementBtns({
  plusIcon,
  deleteIcon,
  disableIcon,
  addMorePlayers,
}) {
  // function addMorePlayers() {
  //   setIsAddingPlayers(true);
  // }
  return (
    <div className="active-game-action-btns grid grid-cols-3 items-center justify-center gap-x-2">
      <button
        className="active-game-action-btn add-more-player-btn px-2"
        onClick={addMorePlayers}
      >
        <img className="h-6" src={plusIcon} alt="Add More Player" />
      </button>
      <button className="active-game-action-btn delete-player-btn px-2">
        <img className="h-6" src={deleteIcon} alt="Delete-player" />
      </button>
      <button className="active-game-action-btn px-2">
        <img className="h-6" src={disableIcon} alt="Disable-player-btn" />
      </button>
    </div>
  );
}

export default PlayerManagementBtns;
