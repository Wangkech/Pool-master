import { Link } from "react-router";
import { useGameContext } from "../context/useGameContext";

function StartNewGame({ setIsAddingPlayers }) {
  //   const { setIsAddingPlayers } = useGameContext();
  return (
    <Link
      onClick={() => setIsAddingPlayers(true)}
      to={"/"}
      className="cursor-pointer rounded-2xl bg-(--primary-color) p-2 text-2xl font-bold text-black"
    >
      Start New Game
    </Link>
  );
}

export default StartNewGame;
