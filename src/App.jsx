import { useState } from "react";
import Header from "./components/Header";

import data from "./dummyData.json";
import { Player } from "./logic/players.js";
import { GameEngine } from "./logic/gameEngine.js";
// import "./css/App.css";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

function App() {
  const storedData = data;

  const session = new GameEngine();

  const [playerList, setPlayerList] = useState(session.players);

  console.log(storedData);
  console.log(playerList);
  // window.addEventListener("load", getExistingPlayers());

  return (
    <div className="relative grid h-screen w-screen grid-rows-[75px_1fr_76px] flex-col bg-[#1f1f1f] text-white">
      <Header />
      <Container
        // getExistingPlayers={getExistingPlayers}
        playerList={playerList}
        setPlayerList={setPlayerList}
      />
      <Navbar />
    </div>
  );
}

export default App;
