import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function LeaderBoardRow({
  num,
  name,
  currentSort,
  roundsPlayed,
  wins,
  topscore,
  avgScore,
  totalpoints,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onClick={() => {
        if (!isExpanded) {
          setIsExpanded(true);
        } else {
          setIsExpanded(false);
        }
      }}
      className="flex flex-col rounded-2xl bg-(--accent-bg) px-2"
    >
      <span className="h grid w-full grid-cols-[3rem_1fr_5rem_2rem] gap-2 overflow-y-auto py-4 capitalize">
        <p className="col-1 text-center">{num}</p>
        <p className="col-2">{name}</p>
        {!isExpanded && <p className="col-3 text-center">{currentSort}</p>}{" "}
        <FontAwesomeIcon
          icon={faChevronCircleDown}
          className={`col-4 transition-all duration-300 ease-in-out ${isExpanded && "rotate-180 transition-all duration-300 ease-in-out"}`}
        />
      </span>

      {isExpanded && (
        <div
          className={`grid grid-cols-3 gap-2 px-4 pb-4 text-center transition-all duration-300 ease-in-out ${isExpanded && " transition-all duration-300 ease-in-out"}`}
        >
          <span className="rounded-2xl bg-green-800">
            <p className="text-3xl">{wins}</p>
            <p>Wins</p>
          </span>
          <span className="rounded-2xl bg-green-800">
            <p className="text-3xl">{topscore}</p>
            <p>Best Score</p>
          </span>
          <span className="rounded-2xl bg-green-800">
            <p className="text-3xl">{totalpoints}</p>
            <p>Total Pts.</p>
          </span>
          <span className="rounded-2xl bg-green-800">
            <p className="text-3xl">{roundsPlayed.length}</p>
            <p>Games</p>
          </span>
          <span className="rounded-2xl bg-green-800 py-2">
            <p className="text-3xl">{avgScore}</p>
            <p>Avg. Score</p>
          </span>
        </div>
      )}
    </div>
  );
}

export default LeaderBoardRow;
