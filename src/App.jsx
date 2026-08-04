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
  const { gameState } = useGameContext();

  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  // console.log(playerList);

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
                // addPlayer={addPlayer}
                // playerList={playerList}
                // startNewGame={startNewGame}
                // setPlayerList={setPlayerList}
                setIsAddingPlayers={setIsAddingPlayers}
                // setGameState={setGameState}
                setGameOn={setGameOn}
                gameState={gameState}
                // controller={controller}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame handleStartNewGame={handleStartNewGame} />
            )}
            {gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer
                // currentRound={currentRound}
                setIsAddingPlayers={setIsAddingPlayers}
                // potBall={potBall}
                // startNewRound={startNewRound}
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
