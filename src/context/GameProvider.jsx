import { useGame } from "../hooks/useGame";
import { GameContext } from "./GameContext";
export function GameProvider({ children }) {
  const game = useGame();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
