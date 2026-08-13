import { useGameContext } from "../../../context/useGameContext";
import LeaderBoardRow from "./LeaderBoardRow";

function Leaderboard({ selectedSort, OPTIONS }) {
  const { currentSessionStats } = useGameContext();

  console.log(selectedSort);

  return (
    <div className="row-2 flex h-full scrollbar-none flex-col gap-y-4 overflow-y-auto pb-4">
      {currentSessionStats.players.map((player, index) => (
        <LeaderBoardRow
          OPTIONS={OPTIONS}
          selectedSort={selectedSort}
          avgScore={player.averageScore}
          currentSort={player[selectedSort.value]}
          name={player.name}
          num={index + 1}
          roundsPlayed={player.roundsPlayed}
          topscore={player.topScore}
          totalpoints={player.totalScore}
          wins={player.wins}
          key={player.id}
        />
      ))}
    </div>
  );
}

export default Leaderboard;
