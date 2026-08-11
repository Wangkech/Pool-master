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
      className="cursor-pointer rounded-2xl bg-(--primary-color) p-2 text-2xl font-bold text-black"
    >
      Start New Game
    </button>
  );
}

export default StartNewGame;
