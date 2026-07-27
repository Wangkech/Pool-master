import ActivePlayerCard from "./ActivePlayerCardContainer";

function ActivePlayersList({ playerList }) {
  return (
    <div className="overflow-hidden">
      <ul class="player-card-container flex h-full w-full scrollbar-none flex-col gap-y-4 overflow-auto p-2">
        {playerList.map((player) => (
          <ActivePlayerCard
            score={player.score}
            name={player.name}
            key={player.id}
            ballBasket={player.ballBasket}
          />
        ))}
      </ul>
    </div>
  );
}

export default ActivePlayersList;
