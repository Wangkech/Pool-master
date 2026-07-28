import { useState } from "react";
import Header from "./components/Header";
import "./css/App.css";
import data from "./dummyData.json";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import AddPlayerModal from "./components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "./components/StartNewGame.jsx";
import ActiveGameContainer from "./components/ActiveGame/ActiveGameContainer.jsx";
import { InGamePlayer } from "./logic/players.js";

function App() {
  const [isAddingPlayers, setIsAddingPlayers] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  let storedData = data;

  const [playerList, setPlayerList] = useState(
    storedData ? storedData.players : [],
  );
  const [currentGamePlayers, setCurrentGamePlayers] = useState([]);

  function getCurrentGamePlayers(playersList) {
    let players = playersList.filter(
      (player) => player.isActive && !player.isKnocked,
    );
    const currentPlayers = [];

    players.map((player) => {
      let inGamePlayer = new InGamePlayer(
        player.name,
        player.id,
        player.isActive,
        player.isKnocked,
        player.wins,
      );

      currentPlayers.push(inGamePlayer);
    });

    setCurrentGamePlayers(currentPlayers);
    console.log("current: ", currentPlayers);
  }

  function handleStartNewGame() {
    setIsAddingPlayers(true);
  }

  console.log(playerList);
  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />
      <Container
        child={
          <>
            {isAddingPlayers && (
              <AddPlayerModal
                playerList={playerList}
                setPlayerList={setPlayerList}
                setIsAddingPlayers={setIsAddingPlayers}
                setGameOn={setGameOn}
                getCurrentGamePlayers={getCurrentGamePlayers}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <StartNewGame handleStartNewGame={handleStartNewGame} />
            )}
            {gameOn === true && (
              <ActiveGameContainer playerList={currentGamePlayers} />
            )}
          </>
        }
      />

      <Navbar />
    </div>
  );
}

export default App;
