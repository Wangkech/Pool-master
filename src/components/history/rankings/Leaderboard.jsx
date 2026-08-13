import { useGameContext } from "../../../context/useGameContext";
import LeaderBoardRow from "./LeaderBoardRow";
import SortDropDown from "./SortDropDown";

function Leaderboard() {
  const { currentSessionStats } = useGameContext();

  return (
    <div className="h-auto-auto rid-rows-[repeat(auto,3rem)] grid scrollbar-none overflow-x-auto">
      {currentSessionStats && (
        <>
          <SortDropDown />
          <LeaderBoardRow />
          {currentSessionStats.players.map((player, index) => (
            <LeaderBoardRow
              avgScore={player.averageScore}
              name={player.name}
              num={index + 1}
              roundsPlayed={player.roundsPlayed.length}
              topscore={player.topScore}
              totalpoints={player.totalScore}
              wins={player.wins}
              key={player.id}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default Leaderboard;
