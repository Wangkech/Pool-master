import ActivePlayersList from "./ActivePlayersList";
import BottomRowContainer from "./BottomRowContainer";
import TopRowContainer from "./TopRowContainer";
import plusIcon from "../../assets/icons/Plus.svg";
import deleteIcon from "../../assets/icons/Home.svg";
import disableIcon from "../../assets/icons/History.svg";
import "./ActiveGame.css";
import { useGameContext } from "../../context/useGameContext";

function ActiveGameContainer({ setIsAddingPlayers }) {
  const { currentRound, potBall } = useGameContext();
  function addMorePlayers() {}

  return (
    <div className="grid h-full w-[90vw] grid-rows-[50px_1fr_50px] gap-1 rounded-2xl bg-(--accent-bg) p-2">
      <TopRowContainer
        roundNumber={currentRound.roundNumber}
        deleteIcon={deleteIcon}
        disableIcon={disableIcon}
        plusIcon={plusIcon}
        setIsAddingPlayers={setIsAddingPlayers}
        addMorePlayers={addMorePlayers}
      />
      <ActivePlayersList
        potBall={potBall}
        balls={currentRound.availableBalls}
        roundPlayers={currentRound.players}
      />
      <BottomRowContainer />
    </div>
  );
}

export default ActiveGameContainer;
