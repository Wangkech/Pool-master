// import { controller } from "./logic/controller.js";
import { useEffect, useState } from "react";
// import { useGame } from "./hooks/useGame.js";
import { useGameContext } from "../context/useGameContext.js";
// import Header from "./components/Header.jsx";
import "../css/App.css";
// import Navbar from "./components/Navbar.jsx";
import Container from "../components/Container.jsx";
import AddPlayerModal from "../components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "../components/StartNewGame.jsx";
import ActiveGameContainer from "../components/ActiveGame/ActiveGameContainer.jsx";
// import { InGamePlayer } from "./logic/players.js";

function GamePage() {
  const { gameState, currentRound, currentRoundExists, gameOn } =
    useGameContext();
  const [additionType, setAdditionType] = useState("regular");
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  // const [gameOn, setGameOn] = useState(false);

  function handleStartNewGame() {
    setIsAddingPlayers(true);
  }

  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[--primary-bg] text-white">
      {/* <Header /> */}
      <Container
        child={
          <>
            {isAddingPlayers && (
              <AddPlayerModal
                additionType={additionType}
                setIsAddingPlayers={setIsAddingPlayers}
                // setGameOn={setGameOn}
                gameState={gameState}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame
                setAdditionType={setAdditionType}
                handleStartNewGame={handleStartNewGame}
              />
            )}
            {currentRound && gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer
                setAdditionType={setAdditionType}
                setIsAddingPlayers={setIsAddingPlayers}
                // setGameOn={setGameOn}
              />
            )}
          </>
        }
      />

      {/* <Navbar /> */}
    </div>
  );
}

export default GamePage;
