import Nameinput from "./Nameinput.jsx";
import List from "./List.jsx";
import Actionbtn from "./Actionbtn.jsx";

function Addplayer() {
  return (
    <div className="add-player-modal-container justify-self-cent align-self-center grid h-[90%] min-h-[60vh] w-[70vw] grid-rows-[40px_1fr_40px] rounded-2xl border bg-[#1A1A1A] p-2">
      <Nameinput />
      <List />
      <div className="flex justify-around">
        <Actionbtn id="btn2" text="Cancel" imgURL="/path/to/remove-icon.svg" />
        <Actionbtn id="btn1" text="Save" imgURL="/path/to/add-icon.svg" />
      </div>
    </div>
  );
}

export default Addplayer;
