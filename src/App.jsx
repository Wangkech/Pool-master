import { useState, useEffect } from "react";
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
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  const [gameOn, setGameOn] = useState(true);
  let storedData = getPlayers();
  // let storedData = getFromLocal();

  const [playerList, setPlayerList] = useState(
    storedData ? storedData.players : [],
    // getFromLocal() ? getFromLocal : [],
  );
  function getPlayers() {
    if (data) {
      let newPlayerList = [];
      data.players.map((player) => {
        let inGamePlayer = new InGamePlayer(
          player.name,
          player.id,
          player.isActive,
          player.isKnocked,
          player.wins,
        );
        newPlayerList.push(inGamePlayer);
      });
      return newPlayerList;
    }
  }

  // getPlayers();
  // store data to localStorage
  // useEffect(() => {
  //   const data = JSON.stringify(playerList);
  //   localStorage.setItem("gamedata", data);
  // }, [playerList]);

  // function getFromLocal() {
  //   const data = JSON.parse(localStorage.getItem("gamedata"));
  //   if (data) {
  //     console.log();
  //     return [];
  //   }
  // }
  // useEffect(() => {

  //   getFromLocal();

  //   console.log(playerList);
  // }, []);

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
            {gameOn === true && isAddingPlayers === false && (
              <ActiveGameContainer
                playerList={currentGamePlayers}
                setIsAddingPlayers={setIsAddingPlayers}
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
