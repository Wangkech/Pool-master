import { useContext } from "react";
import { GameContext } from "./GameContext";

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("Cannot Use useGameContext outside APP component");
  }
  return context;
}
