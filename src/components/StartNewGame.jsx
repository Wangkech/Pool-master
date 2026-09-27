// import { useGameContext } from "../context/useGameContext";

import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StartNewGame({ setIsAddingPlayers, setView, tab, fromHistory }) {
  // const { setIsAddingPlayers } = useGameContext();
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border-[0.5px] border-(--accent-bg) bg-(--primary-bg) p-10 shadow-(--base-shadow)">
      <button
        onClick={() => {
          setView(tab);
          setIsAddingPlayers(true);
        }}
        className="flex cursor-pointer flex-col items-center justify-center text-(--primary-color)"
      >
        <FontAwesomeIcon
          className="rounded-lg bg-(--accent-bg) p-5 text-xl shadow-(--base-shadow)"
          icon={faPlus}
        />
      </button>
      <p className="">
        {fromHistory && (
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-4" />
        )}
      </p>
    </div>
  );
}

export default StartNewGame;
