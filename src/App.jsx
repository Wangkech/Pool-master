import { controller } from "./logic/controller.js";
import { useState, useEffect, use } from "react";
import Header from "./components/Header";
import "./css/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import AddPlayerModal from "./components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "./components/StartNewGame.jsx";
import ActiveGameContainer from "./components/ActiveGame/ActiveGameContainer.jsx";
// import { InGamePlayer } from "./logic/players.js";

function App() {
  const [gameState, setGameState] = useState(controller.getSnapshot);
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  const [gameOn, setGameOn] = useState(true);

  console.log(gameState);

  function getCurrentGamePlayers(playersList) {}

  function handleStartNewGame() {}

  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />
      <Container
        child={
          <>
            {isAddingPlayers && <AddPlayerModal />}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame handleStartNewGame={handleStartNewGame} />
            )}
            {gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer />
            )}
          </>
        }
      />

      <Navbar />
    </div>
  );
}

export default App;
