import { useState } from "react";
import { Player } from "../../logic/players.js";

import PlayerNameInput from "./PlayerNameInput.jsx";
import PlayerNameListContainer from "./PlayerNameListContainer.jsx";
import Actionbtn from "./Actionbtn.jsx";
function AddPlayerModal({
  playerList,
  setPlayerList,
  setIsAddingPlayers,
  setGameOn,
  getCurrentGamePlayers,
}) {
  const [players, setPlayers] = useState(playerList);
  const [playerName, setPlayerName] = useState("");

  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName.toLowerCase().trim());

    return newPlayerName;
  }

  function addPlayerToList(e) {
    e.preventDefault();

    const playerNames = [];

    players.map((player) => playerNames.push(player.name));

    if (!playerNames.includes(playerName)) {
      const newPlayer = new Player(playerName);
      let newPlayerList = [...players, newPlayer];

      setPlayers(newPlayerList);
      setPlayerName("");
    } else {
      alert(`${playerName} has already been added`);
    }
  }

  function removePlayer(id) {
    let currentPlayers = players.filter((player) => player.id != id);
    setPlayers(currentPlayers);
    console.log("after: ", players);
  }
  function editPlayerName(id) {
    console.log("edit Player: ", id);
  }

  function saveList() {
    setPlayerList(players);
    setIsAddingPlayers(false);
    setGameOn(true);
    getCurrentGamePlayers(players);
  }

  function cancelList() {
    setPlayers(playerList);
    setIsAddingPlayers(false);
  }

  return (
    <div className="add-player-modal-container justify-self-cent align-self-center grid h-[90%] min-h-[60vh] w-[90vw] grid-rows-[40px_1fr_40px] rounded-2xl border bg-[#1A1A1A] px-2 py-4">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
        saveList={saveList}
        cancelList={cancelList}
      />
      <PlayerNameListContainer
        players={players}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
      <div className="flex justify-around">
        <Actionbtn action={cancelList} id="btn2" text="Cancel" imgURL="" />
        <Actionbtn action={saveList} id="btn1" text="Save" imgURL={""} />
      </div>
    </div>
  );
}

export default AddPlayerModal;
