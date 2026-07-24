import { useState } from "react";
import Header from "./components/Header";

import data from "./dummyData.json";
// import { GameEngine } from "./logic/gameEngine.js";
// import "./css/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import AddPlayerModal from "./components/AddPlayerModal/AddPlayerModal.jsx";

function App() {
  let storedData = data;

  // const session = new GameEngine();

  const [playerList, setPlayerList] = useState(
    storedData ? storedData.players : [],
  );

  // console.log(storedData.players);
  // console.log(playerList);
  // window.addEventListener("load", getExistingPlayers());
  console.log(playerList);
  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />

      <Container
        child={
          <AddPlayerModal
            playerList={playerList}
            setPlayerList={setPlayerList}
          />
        }
        // getExistingPlayers={getExistingPlayers}
      />
      <Navbar />
    </div>
  );
}

export default App;
