import { useState } from "react";
import PlayerNameInput from "./PlayerNameInput.jsx";
import PlayerNameListContainer from "./PlayerNameListContainer.jsx";
import Actionbtn from "./Actionbtn.jsx";
import { useGameContext } from "../../context/useGameContext.js";
function AddPlayerModal({ additionType, setIsAddingPlayers }) {
  const {
    addPlayer,
    startNewGame,
    playerList,
    setGameOn,
    // currentGameExists,
    addLatePlayer,
  } = useGameContext();
  // const players = useState(gameState.players);
  const [playerName, setPlayerName] = useState("");
  // const { addPlayer } = useGame();
  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName.toLowerCase().trim());
  }
  const [list, setList] = useState([]);

  function addPlayerToList(e) {
    e.preventDefault();

    if (playerName != "") {
      if (additionType === "regular") {
        addPlayer(playerName);
        setList([...list, playerName]);
        console.log("reg add");
      } else {
        console.log("late add");
        addLatePlayer(playerName);
      }
    }

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
      startNewGame();
      setIsAddingPlayers(false);
      setGameOn(true);
    } else {
      alert(`Add more than ${playerList.length} Players to Proceed`);
    }
  }

  function cancelList() {
    setIsAddingPlayers(false);
  }

  return (
    <div className="row-2 grid h-[60%] w-[90vw] grid-rows-[40px_1fr_40px] self-center overflow-y-hidden rounded-2xl bg-(--accent-bg) px-2 py-4">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
        saveList={saveList}
        cancelList={cancelList}
      />
      <PlayerNameListContainer
        // playerList={playerList}
        list={list}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
      <div className="flex justify-around">
        <Actionbtn
          action={cancelList}
          id="btn2"
          text="Cancel"

          imgURL=""
        />
        <Actionbtn
          action={saveList}
          style={"bg-white border-none text-black"}
          id="btn1"
          text="Continue"
          imgURL={""}
        />
      </div>
    </div>
  );
}

export default AddPlayerModal;
