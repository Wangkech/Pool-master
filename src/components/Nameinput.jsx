import Actionbtn from "./Actionbtn.jsx";
function Nameinput() {
  return (
    <form
      action="submit"

      className="add-player-form align-center flex justify-center gap-4"
    >
      <input
        type="text"
        className="player-name-input flex h-10 w-auto justify-center gap-2 rounded-[5rem] border-2 border-none bg-white p-4 text-[0.875rem] text-white shadow shadow-black placeholder:text-[#1F1F1F]"
        placeholder="Enter Player Name...  "
      />
      <Actionbtn
        id="add-player"
        style=""
        text="Add Player"
        doSome={(e) => {
          e.preventDefault();
        }}
        imgURL="./src/assets/icons/plus.svg"
      />
    </form>
  );
}

export default Nameinput;
