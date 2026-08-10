import PlayerNameList from "./PlayerNameList";
import { useGameContext } from "../../context/useGameContext";

function PlayerNameListContainer({ removePlayer, list, editPlayerName }) {
  const { playerList } = useGameContext();

  return (
    <div className="list-container   overflow-y-auto scrollbar-none ">
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
