// import { controller } from "./logic/controller.js";
import { useState } from "react";
// import { useGame } from "./hooks/useGame.js";
import { useGameContext } from "./context/useGameContext.js";
import Header from "./components/Header";
import "./css/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import AddPlayerModal from "./components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "./components/StartNewGame.jsx";
import ActiveGameContainer from "./components/ActiveGame/ActiveGameContainer.jsx";
// import { InGamePlayer } from "./logic/players.js";

function App() {
  const { gameState, currentRound } = useGameContext();

  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  function handleStartNewGame() {
    setIsAddingPlayers(true);
  }

  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[--primary-bg] text-white">
      <Header />
      <Container
        child={
          <>
            {isAddingPlayers && (
              <AddPlayerModal
                setIsAddingPlayers={setIsAddingPlayers}
                setGameOn={setGameOn}
                gameState={gameState}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame handleStartNewGame={handleStartNewGame} />
            )}
            {currentRound && gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer
                setIsAddingPlayers={setIsAddingPlayers}
                setGameOn={setGameOn}
              />
            )}
          </>
        }
      />

      <Navbar />
    </div>
  );
}

export default App;
