import { useState } from "react";
import { useGameContext } from "../../../context/useGameContext";
import LeaderBoardHeader from "./LeaderBoardHeader";
import LeaderBoardRow from "./leaderBoardRow";
import SortDropDown from "./SortDropDown";

function Leaderboard() {
  const { currentSessionStats } = useGameContext();

  const OPTIONS = [
    {
      value: "wins",
      text: "Wins",
    },
    {
      value: "averageScore",
      text: "Avg. Score",
    },
    {
      value: "topScore",
      text: "Top Score",
    },
    {
      value: "totalScore",
      text: "Total Pts.",
    },
  ];
  const [selectedSort, setSelectedSort] = useState(
    OPTIONS.find((option) => option.value === "wins"),
  );
  console.log(selectedSort);

  return (
    <div className="h-auto-auto rid-rows-[repeat(auto,3rem)] grid scrollbar-none overflow-x-auto">
      {currentSessionStats && (
        <>
          <SortDropDown
            OPTIONS={OPTIONS}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
          <LeaderBoardHeader selectedSort={selectedSort} />
          {currentSessionStats.players.map((player, index) => (
            <LeaderBoardRow
              OPTIONS={OPTIONS}
              selectedSort={selectedSort}
              avgScore={player.averageScore}
              currentSort={player[selectedSort.value]}
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
