import { useEffect, useRef } from "react";
import PlayerNameList from "./PlayerNameList";
import { useGameContext } from "../../context/useGameContext";

function PlayerNameListContainer({ removePlayer, editPlayerName }) {
  // const playerNameListComp = PlayerNameList
  const { playerList } = useGameContext;
  const playerNameListRef = useRef(null);
  // console.log(playerList);

  useEffect(() => {
    const playerNameListElem = playerNameListRef.current;

    if (playerNameListElem) {
      playerNameListElem.scrollTop = playerNameListElem.scrollHeight;
    }
  }, [playerList]);
  return (
    <div className="list-container overflow-hidden">
      <PlayerNameList
        ref={playerNameListRef}
        players={playerList}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
    </div>
  );
}

export default PlayerNameListContainer;
