import { useState } from "react";
import { Player } from "../../logic/players.js";

import PlayerNameInput from "./PlayerNameInput.jsx";
import PlayerNameList from "./PlayerNameListContainer.jsx";
import Actionbtn from "./Actionbtn.jsx";
function AddPlayerModal({ playerList, setPlayerList, setIsAddingPlayers }) {
  const [players, setPlayers] = useState(playerList);
  const [playerName, setPlayerName] = useState("");

  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName);
    return newPlayerName;
  }

  function addPlayerToList(e) {
    e.preventDefault();
    // let newPlayerList = players;
    const newPlayer = new Player(playerName);
    let newPlayerList = [...players, newPlayer];

    setPlayers(newPlayerList);
    setPlayerName("");

    console.log(playerList);
  }

  function removePlayer(id) {
    console.log("Before: ", players);
    let currentPlayers = players.filter((player) => player.id != id);
    // setPlayers(currentPlayers);
    setPlayers(currentPlayers);
    console.log("after: ", players);
  }
  function editPlayerName(id) {
    console.log("edit Player: ", id);
  }

  function saveList() {
    setPlayerList(players);
    setIsAddingPlayers(false)
    console.log(playerList);
  }

  function cancelList() {
    setPlayers(playerList)
    setIsAddingPlayers(false)
  }

  return (
    <div className="add-player-modal-container justify-self-cent align-self-center grid h-[90%] min-h-[60vh] w-[70vw] grid-rows-[40px_1fr_40px] rounded-2xl border bg-[#1A1A1A] p-2">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
        saveList={saveList}
        cancelList={cancelList}
      />
      <PlayerNameList
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
