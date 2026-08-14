import { useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../context/useGameContext";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import DeleteBtn from "../DeleteBtn";

function PlayerNameList({ editPlayerName }) {
  const { playerList, deletePlayer } = useGameContext();
  const playerNameListRef = useRef(null);
  useEffect(() => {
    const playerNameListElem = playerNameListRef.current;

    if (playerNameListElem) {
      playerNameListElem.scrollTop = playerNameListElem.scrollHeight;
    }
  }, [playerList]);
  return (
    <ul
      ref={playerNameListRef}
      className="block scrollbar-none items-center gap-2 overflow-y-auto p-2"
    >
      {playerList.map((player, index) => (
        <li
          key={player.id}
          className="my-auto grid h-12 w-full grid-cols-[150px_1fr_1fr] items-center justify-around"
        >
          <span className="grid grid-cols-[1.25rem_1fr] items-center gap-x-4">
            <p className="py-auto w-auto rounded-[50%] bg-white text-center text-[0.785rem] font-bold break-all text-black">
              {index + 1}
            </p>
            <p> {player.name}</p>
          </span>
          <button
            onClick={() => editPlayerName(player.id)}
            className="col-2 hidden h-10"
          >
            <FontAwesomeIcon icon={faUserPen} />
          </button>
          <DeleteBtn
            deletePlayer={deletePlayer}
            id={player.id}
            playerName={player.name}
          />
          {/* <button onClick={() => deletePlayer(player.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button> */}
        </li>
      ))}
    </ul>
  );
}

export default PlayerNameList;
