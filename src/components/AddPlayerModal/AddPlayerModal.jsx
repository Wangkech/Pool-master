import { useState } from "react";
import PlayerNameInput from "./PlayerNameInput.jsx";
import PlayerNameListContainer from "./PlayerNameListContainer.jsx";
import Actionbtn from "./Actionbtn.jsx";
import { useGameContext } from "../../context/useGameContext.js";
import { useDialog } from "../../context/useDialog.js";

function AddPlayerModal({ additionType, setIsAddingPlayers }) {
  const {
    addPlayer,
    startNewGame,
    playerList,
    setGameOn,
    currentRoundExists,
    // currentGameExists,
    addLatePlayer,
  } = useGameContext();
  const { alert } = useDialog();
  // const players = useState(gameState.players);
  const [playerName, setPlayerName] = useState("");
  // const { addPlayer } = useGame();
  function getPlayerName(e) {
    let newPlayerName = e.target.value;
    setPlayerName(newPlayerName.toLowerCase().trim());
  }
  // const [list, setList] = useState([]);

  async function addPlayerToList(e) {
    e.preventDefault();
    async function alertDuplicate() {
      await alert({
        title: "Player Already Added",
        message: `${playerName} was already added!`,
        actionText: "OK",
        alertType: "warning",
      });
    }
    if (playerName != "") {
      if (additionType === "regular") {
        const found = addPlayer(playerName);
        if (found) {
          alertDuplicate();
        }
      } else {
        const found = addLatePlayer(playerName);
        if (found) {
          alertDuplicate();
        }
      }
      // if (playerList.find((player) => player.name === playerName)) {

      // } else {
      //   if (additionType === "regular") {
      //     addPlayer(playerName);
      //   } else {
      //     addLatePlayer(playerName);
      //   }
      // }
    }

    setPlayerName("");
  }

  async function saveList() {
    if (playerList.length > 1) {
      startNewGame();
      setIsAddingPlayers(false);
      setGameOn(true);
    } else {
      await alert({
        title: "Not Enough Players!",
        message: `You need at least 2 players. Currently added: ${playerList.length}`,
        actionText: "OK",
        alertType: "warning",
      });
    }
  }

  function cancelList() {
    setIsAddingPlayers(false);
  }

  return (
    <div className="grid h-full w-[90vw] grid-rows-[40px_1fr_40px] gap-4 self-center overflow-y-hidden rounded-2xl bg-(--accent-bg) px-2 py-4">
      <PlayerNameInput
        playerName={playerName}
        setPlayerName={setPlayerName}
        getPlayerName={getPlayerName}
        addPlayerToList={addPlayerToList}
        saveList={saveList}
        cancelList={cancelList}
      />
      <PlayerNameListContainer />
      <div className="flex justify-around">
        {!currentRoundExists && (
          <Actionbtn action={cancelList} id="btn2" text="Cancel" imgURL="" />
        )}{" "}
        <Actionbtn
          action={saveList}
          style={`bg-white border-none text-black ${currentRoundExists && " w-1/2"} text-center rounded-lg`}
          id="btn1"
          text="Continue"
          imgURL={""}
        />
      </div>
    </div>
  );
}

export default AddPlayerModal;
