import Actionbtn from "./Actionbtn.jsx";
// import AddIcon from ".src/assets/icons/plus.svg";

function PlayerNameInput({ playerName, getPlayerName, addPlayerToList }) {
  return (
    <form
      action="submit"
      className="add-player-form align-center grid max-w-125 grid-cols-[1fr_3rem] justify-center gap-2"
    >
      <input
        type="text"
        className="player-name-input flex h-10 min-w-[60%] justify-center gap-2 rounded-[5rem] border-2 border-none bg-white p-4 text-[0.875rem] text-black shadow-black placeholder:text-[#1F1F1F]"
        placeholder=" Enter Player Name...  "
        onChange={getPlayerName}
        value={playerName}
      />
      <Actionbtn
        id="add-player"
        style="text-[12px] shadow-[0_0_4px_20px_rgb(20_33_23_0.5)] h-f"
        text="Add"
        action={addPlayerToList}
        imgURL={""}
      />
    </form>
  );
}

export default PlayerNameInput;
