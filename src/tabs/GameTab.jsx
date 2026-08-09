import { useState } from "react";
import { useGameContext } from "../context/useGameContext.js";
import Container from "../components/Container.jsx";
import AddPlayerModal from "../components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "../components/StartNewGame.jsx";
import ActiveGameContainer from "../components/ActiveGame/ActiveGameContainer.jsx";

function GameTab({ setView, isAddingPlayers, setIsAddingPlayers }) {
  const {
    gameState,
    currentRound,
    gameOn,
  } = useGameContext();
  const [additionType, setAdditionType] = useState("regular");

  // const [gameOn, setGameOn] = useState(false);

  return (
    <>
      <title>Pool Master - scoreTracker</title>
      <Container

        child={
          <>
            {isAddingPlayers === true && (
              <AddPlayerModal
                additionType={additionType}
                setIsAddingPlayers={setIsAddingPlayers}
                gameState={gameState}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame tab="home" setView={setView} setIsAddingPlayers={setIsAddingPlayers} />
            )}
            {currentRound && gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer
                setAdditionType={setAdditionType}
                setIsAddingPlayers={setIsAddingPlayers}
              />
            )}
          </>
        }
      />
    </>
  );
}

export default GameTab;
