import { useState } from "react";

import PlayerNameInput from "./PlayerNameInput.jsx";
import PlayerNameListContainer from "./PlayerNameListContainer.jsx";
import Actionbtn from "./Actionbtn.jsx";
import { useGameContext } from "../../context/useGameContext.js";
function AddPlayerModal({ setIsAddingPlayers, setGameOn }) {
  const { addPlayer, startNewGame, playerList } = useGameContext();
  // const players = useState(gameState.players);
  const [playerName, setPlayerName] = useState("");
  // const { addPlayer } = useGame();
  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName.toLowerCase().trim());
  }

  function addPlayerToList(e) {
    e.preventDefault();
    if (playerName != "") addPlayer(playerName);
    setPlayerName("");
  }

  function removePlayer(id) {
    //   let currentPlayers = players.filter((player) => player.id != id);
    //   currentPlayers;
    //   console.log("after: ", players);
  }
  function editPlayerName(id) {
    // console.log("edit Player: ", id);
  }

  function saveList() {
    if (playerList.length > 1) {
      setIsAddingPlayers(false);
      startNewGame();
      setGameOn(true);
    } else {
      alert(`Add more than ${playerList.length} Players to Proceed`);
    }
  }

  function cancelList() {
    setIsAddingPlayers(false);
  }

  return (
    <div className="add-player-modal-container justify-self-cent grid h-[90%] min-h-[60vh] w-[90vw] grid-rows-[40px_1fr_40px] self-center rounded-2xl border bg-[#1A1A1A] px-2 py-4">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
        saveList={saveList}
        cancelList={cancelList}
      />
      <PlayerNameListContainer
        playerList={playerList}
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
