import { useGameContext } from "../../context/useGameContext";
import ActivePlayerCard from "./ActivePlayerCard";

function ActivePlayersList({ showDeletePlayer }) {
  const { availableBalls, roundPlayers } = useGameContext();

  return (
    <div className="h-full max-h-[cal(100%-11rem)] overflow-hidden">
      <ul className="player-card-container flex h-full w-full scrollbar-none flex-col gap-y-4 overflow-y-auto p-2">
        {roundPlayers &&
          roundPlayers.map((player) => (
            <ActivePlayerCard
              showDeletePlayer={showDeletePlayer}
              balls={availableBalls}
              key={player.id}
              id={player.id}
              name={player.name}
              score={player.state.score}
              basket={player.state.ballBasket}
            />
          ))}
      </ul>
    </div>
  );
}

export default ActivePlayersList;
