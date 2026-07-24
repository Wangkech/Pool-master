import { useState } from "react";

import PlayerNameInput from "./PlayerNameInput.jsx";
import List from "./List.jsx";
import Actionbtn from "./Actionbtn.jsx";
function AddPlayerModal() {
  const [players, setPlayers] = useState([
    { name: "wangkech", id: crypto.randomUUID() },
  ]);
  const [playerName, setPlayerName] = useState("");

  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName);
    return newPlayerName;
  }

  function addPlayerToList(e) {
    e.preventDefault();
    let newPlayerList = players;
    let newPlayer = {
      name: playerName,
      id: crypto.randomUUID(),
    };

    newPlayerList.push(newPlayer);

    setPlayers(newPlayerList);
    setPlayerName("");

    console.log(players);
  }

  function removePlayer(id) {
    let currentPlayers = players.filter((player) => player.id != id);
    setPlayers(currentPlayers);
  }
  function editPlayerName(id) {
    console.log("edit Player: ", id);
  }
  return (
    <div className="add-player-modal-container justify-self-cent align-self-center grid h-[90%] min-h-[60vh] w-[70vw] grid-rows-[40px_1fr_40px] rounded-2xl border bg-[#1A1A1A] p-2">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
      />
      <List
        players={players}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
      <div className="flex justify-around">
        <Actionbtn id="btn2" text="Cancel" imgURL="" />
        <Actionbtn id="btn1" text="Save" imgURL={""} />
      </div>
    </div>
  );
}

export default AddPlayerModal;
