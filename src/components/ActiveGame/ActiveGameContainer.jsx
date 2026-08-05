import { useState } from "react";

import ActivePlayersList from "./ActivePlayersList";
import BottomRowContainer from "./BottomRowContainer";
import TopRowContainer from "./TopRowContainer";
import plusIcon from "../../assets/icons/Plus.svg";
import deleteIcon from "../../assets/icons/Home.svg";
import disableIcon from "../../assets/icons/History.svg";
import "./ActiveGame.css";
import { useGameContext } from "../../context/useGameContext";

function ActiveGameContainer({
  setAdditionType,
  setGameOn,
  setIsAddingPlayers,
}) {
  const { currentRound, potBall } = useGameContext();
  const [showDeletePlayer, setShowDeletePlayer] = useState(null);
  function addMorePlayers() {}

  return (
    <div className="grid h-full w-[90vw] grid-rows-[50px_1fr_50px] gap-1 rounded-2xl bg-(--accent-bg) p-2">
      <TopRowContainer
        showDeletePlayer={showDeletePlayer}
        roundNumber={currentRound && currentRound.roundNumber}
        deleteIcon={deleteIcon}
        disableIcon={disableIcon}
        plusIcon={plusIcon}
        setAdditionType={setAdditionType}
        setIsAddingPlayers={setIsAddingPlayers}
        setShowDeletePlayer={setShowDeletePlayer}
        addMorePlayers={addMorePlayers}
      />
      <ActivePlayersList
        showDeletePlayer={showDeletePlayer}
        potBall={potBall}
        balls={currentRound && currentRound.availableBalls}
        roundPlayers={currentRound && currentRound.players}
      />
      <BottomRowContainer
        setAdditionType={setAdditionType}
        setGameOn={setGameOn}
        setIsAddingPlayers={setIsAddingPlayers}
      />
    </div>
  );
}

export default ActiveGameContainer;
