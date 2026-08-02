function GamesCountTracker({ roundNumber }) {
  return (
    <div className="game-number-holder rounded-2xl bg-amber-50 p-1 px-2 text-black">
      <p className="game-number text-[0.785rem]">Game No: {roundNumber}</p>
    </div>
  );
}

export default GamesCountTracker;
