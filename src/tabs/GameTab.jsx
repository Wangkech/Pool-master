import { useState } from "react";
import { useGameContext } from "../context/useGameContext.js";
import Container from "../components/Container.jsx";
import AddPlayerModal from "../components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "../components/StartNewGame.jsx";
import ActiveGameContainer from "../components/ActiveGame/ActiveGameContainer.jsx";

function GameTab({
  setView,
  isAddingPlayers,
  setActiveTab,
  setIsAddingPlayers,
}) {
  const { gameState, currentRoundExists, gameOn } = useGameContext();
  const [additionType, setAdditionType] = useState("regular");

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
              <div className="px- flex h-1/2 flex-col justify-center rounded-2xl bg-(--accent-bgb)">
                <StartNewGame
                  tab="home"
                  setView={setView}
                  setIsAddingPlayers={setIsAddingPlayers}
                />
              </div>
            )}
            {currentRoundExists &&
              gameOn === true &&
              isAddingPlayers === false && (
                <ActiveGameContainer
                  setView={setView}
                  setAdditionType={setAdditionType}
                  setIsAddingPlayers={setIsAddingPlayers}
                  setActiveTab={setActiveTab}
                />
              )}
          </>
        }
      />
    </>
  );
}

export default GameTab;
