import PlayerNameList from "./PlayerNameList";
import { useGameContext } from "../../context/useGameContext";

function PlayerNameListContainer({ removePlayer, list, editPlayerName }) {
  const { playerList } = useGameContext();

  return (
    <div className="list-container scrollbar-none overflow-y-hidden py-4">
      <PlayerNameList
        // ref={playerNameListRef}
        list={list}
        players={playerList}
        editPlayerName={editPlayerName}
        removePlayer={removePlayer}
      />
    </div>
  );
}

export default PlayerNameListContainer;
