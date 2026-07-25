import { useEffect, useRef } from "react";
import PlayerNameList from "./PlayerNameList";

function PlayerNameListContainer({ players, removePlayer, editPlayerName }) {
  // const playerNameListComp = PlayerNameList
  const playerNameListRef = useRef(null);
  useEffect(() => {
    const playerNameListElem = playerNameListRef.current

    if (playerNameListElem) {
      playerNameListElem.scrollTop = playerNameListElem.scrollHeight;
    }
  }, [players]);
  return (
    <div className="list-container  overflow-hidden">
      <PlayerNameList
        ref={playerNameListRef}
        players={players}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
    </div>
  );
}

export default PlayerNameListContainer;
