import { useState } from "react";
import Header from "./components/Header";

import data from "./dummyData.json";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import AddPlayerModal from "./components/AddPlayerModal/AddPlayerModal.jsx";
import StartNewGame from "./components/StartNewGame.jsx";

function App() {
  const [isAddingPlayers, setIsAddingPlayers] = useState(false)
  let storedData = data;

  const [playerList, setPlayerList] = useState(
    storedData ? storedData.players : [],
  );

  function handleStartNewGame() {
    setIsAddingPlayers(true)
  }

  console.log(playerList);
  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />
      <Container
        child={
          <>
            {isAddingPlayers && (<AddPlayerModal
              playerList={playerList}
              setPlayerList={setPlayerList}
              setIsAddingPlayers={setIsAddingPlayers}
            />)}
            {isAddingPlayers === false && <StartNewGame handleStartNewGame={handleStartNewGame} />}
          </>
        } />


      <Navbar />
    </div>
  );
}

export default App;
