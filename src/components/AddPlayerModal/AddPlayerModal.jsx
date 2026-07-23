import PlayerNameInput from "./PlayerNameInput.jsx";
import List from "./List.jsx";
import Actionbtn from "./Actionbtn.jsx";

function AddPlayerModal() {
  return (
    <div className="add-player-modal-container justify-self-cent align-self-center grid h-[90%] min-h-[60vh] w-[70vw] grid-rows-[40px_1fr_40px] rounded-2xl border bg-[#1A1A1A] p-2">
      <PlayerNameInput />
      <List />
      <div className="flex justify-around">
        <Actionbtn id="btn2" text="Cancel" imgURL="" />
        <Actionbtn id="btn1" text="Save" imgURL={""} />
      </div>
    </div>
  );
}

export default AddPlayerModal;
