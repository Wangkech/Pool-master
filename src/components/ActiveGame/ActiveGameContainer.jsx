import ActivePlayersList from "./ActivePlayersList";
import BottomRowContainer from "./BottomRowContainer";
import TopRowContainer from "./TopRowContainer";
import plusIcon from "../../assets/icons/Plus.svg";
import deleteIcon from "../../assets/icons/Home.svg";
import disableIcon from "../../assets/icons/History.svg";
import "./ActiveGame.css";

function ActiveGameContainer({ playerList, setIsAddingPlayers }) {
  function addMorePlayers() {
    setIsAddingPlayers(true);
    console.log("set");
  }

  return (
    <div className="grid h-full w-[90vw] grid-rows-[50px_1fr_50px] gap-1 rounded-2xl bg-(--accent-bg) p-2">
      <TopRowContainer
        deleteIcon={deleteIcon}
        disableIcon={disableIcon}
        plusIcon={plusIcon}
        // setIsAddingPlayers={setIsAddingPlayers}
        addMorePlayers={addMorePlayers}
      />
      <ActivePlayersList playerList={playerList} />
      <BottomRowContainer />
    </div>
  );
}

export default ActiveGameContainer;
