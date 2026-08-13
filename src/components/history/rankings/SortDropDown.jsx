import { faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGameContext } from "../../../context/useGameContext";

function SortDropDown() {
  const { sortPlayerStarts } = useGameContext();
  const [selectedSort, setSelectedSort] = useState("wins");

  const OPTIONS = [
    {
      value: "wins",
      text: "Wins",
    },
    {
      value: "averageScore",
      text: "Average Score",
    },
    {
      value: "topScore",
      text: "Top Score",
    },
    {
      value: "totalScore",
      text: "Total Points",
    },
  ];

  function sortPlayers(order) {
    sortPlayersStats(order);
  }

  return (
    <div className="flex w-full items-end justify-end gap-x-2 py-2">
      <FontAwesomeIcon icon={faSortAmountAsc} />
      <select
        defaultValue={selectedSort}
        onChange={(e) => sortPlayerStarts(e.target.value)}
        className="rounded-t-lg bg-(--accent-bg) px-1 text-sm capitalize"
      >
        {OPTIONS.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropDown;
