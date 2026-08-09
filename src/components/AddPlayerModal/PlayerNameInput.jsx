import AddPlayerBtn from "./AddPlayerBtn.jsx";
// import AddIcon from ".src/assets/icons/plus.svg";

function PlayerNameInput({ playerName, getPlayerName, addPlayerToList }) {
  return (
    <form
      onSubmit={addPlayerToList}
      className="add-player-form align-center grid grid-cols-[1fr_3rem] items-center justify-center gap-2 px-2"
    >
      <input
        type="text"
        className="player-name-input flex h-10 min-w-[60%] justify-center gap-2 rounded-[5rem] border-2 border-none bg-white p-4 text-[0.875rem] text-black shadow-black placeholder:text-[#1F1F1F]"
        placeholder=" Enter Player Name...  "
        onChange={getPlayerName}
        value={playerName}
      />
      <AddPlayerBtn />
    </form>
  );
}

export default PlayerNameInput;
