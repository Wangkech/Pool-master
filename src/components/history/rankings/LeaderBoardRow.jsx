function LeaderBoardRow({
  num,
  name,
  roundsPlayed,
  wins,
  topscore,
  avgScore,
  totalpoints,
}) {
  return (
    <span className="overflow-xl-auto h- grid w-full grid-cols-[3rem_8rem_repeat(2,4rem)_5rem_8rem_5rem] gap-2 border-b py-1 capitalize">
      <p className="text-center">{num ?? "No"}</p>
      <p>{name ?? "name"}</p>
      <p className="text-center">{wins ?? "wins"}</p>
      <p className="text-center">{roundsPlayed ?? "RNDs"}</p>
      <p className="text-center">{topscore ?? "topscore"}</p>
      <p className="text-center">{avgScore ?? "Avg. pts"}</p>
      <p className="text-center">{totalpoints ?? "total pts"}</p>
    </span>
  );
}

export default LeaderBoardRow;
