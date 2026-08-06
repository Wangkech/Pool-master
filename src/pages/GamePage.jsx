import { useState } from "react";
import { useGameContext } from "../context/useGameContext.js";
import Container from "../components/Container.jsx";
import AddPlayerModal from "../components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "../components/StartNewGame.jsx";
import ActiveGameContainer from "../components/ActiveGame/ActiveGameContainer.jsx";

function GamePage() {
  const {
    gameState,
    currentRound,
    gameOn,
    // isAddingPlayers,
    // setIsAddingPlayers,
  } = useGameContext();
  const [additionType, setAdditionType] = useState("regular");
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);

  // const [gameOn, setGameOn] = useState(false);

  return (
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
            <StartNewGame setIsAddingPlayers={setIsAddingPlayers} />
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
  );
}

export default GamePage;
