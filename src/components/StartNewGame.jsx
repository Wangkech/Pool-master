// import { useGameContext } from "../context/useGameContext";

function StartNewGame({ setIsAddingPlayers, setView, tab }) {
  // const { setIsAddingPlayers } = useGameContext();
  return (
    <button
      onClick={() => {
        setView(tab);
        setIsAddingPlayers(true);
      }}
      to="/"
      className="h-10 cursor-pointer rounded-lg bg-(--primary-color) p-2 text-2xl font-semibold text-black shadow-(--base-shadow)"
    >
      Start New Game
    </button>
  );
}

export default StartNewGame;
