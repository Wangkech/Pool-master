// import { useGameContext } from "../context/useGameContext";

import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StartNewGame({ setIsAddingPlayers, setView, tab, fromHistory }) {
  // const { setIsAddingPlayers } = useGameContext();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-[0.5px] border-(--accent-bg) bg-(--primary-bg) p-10 shadow-(--base-shadow)">
      {" "}
      <button
        onClick={() => {
          setView(tab);
          setIsAddingPlayers(true);
        }}
        className="bg-gray- font- flex cursor-pointer flex-col items-center justify-center gap-4 p-2 text-(--primary-color)"
      >
        <FontAwesomeIcon
          className="gap- h-15 w-20 rounded-lg bg-(--accent-bg) p-5 text-3xl shadow-(--base-shadow)"
          icon={faPlus}
        />
        <p className="text-lg">
          {fromHistory && (
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-4" />
          )}
          Start New Game
        </p>
      </button>
    </div>
  );
}

export default StartNewGame;
