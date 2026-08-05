import { useGameContext } from "../../context/useGameContext";
import ActivePlayerCard from "./ActivePlayerCard";

function ActivePlayersList({ showDeletePlayer }) {
  const { availableBalls, roundPlayers } = useGameContext();

  return (
    <div className="overflow-hidden">
      <ul className="player-card-container flex h-full w-full scrollbar-none flex-col gap-y-4 overflow-auto p-2">
        {roundPlayers &&
          roundPlayers.map((player) => (
            <ActivePlayerCard
              showDeletePlayer={showDeletePlayer}
              balls={availableBalls}
              key={player.id}
              id={player.id}
              name={player.name}
              score={player.state.score}
              // basket={balls}
              basket={player.state.ballBasket}
            />
          ))}
      </ul>
    </div>
  );
}

export default ActivePlayersList;
