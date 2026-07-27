import ActivePlayerCard from "./ActivePlayerCardContainer";

function ActivePlayersList() {
  return (
    <div className="overflow-hidden">
      <ul class="player-card-container flex h-full w-full scrollbar-none flex-col gap-y-4 overflow-auto p-2">
        <ActivePlayerCard />
        <ActivePlayerCard />
        <ActivePlayerCard />
        <ActivePlayerCard />
        <ActivePlayerCard />
      </ul>
    </div>
  );
}

export default ActivePlayersList;
