function LeaderBoardRow({
  num,
  name,
  currentSort,
  //   roundsPlayed,
  wins,
  //   topscore,
  //   avgScore,
  //   totalpoints,
}) {
  return (
    <span className="overflow-xl-auto h- grid w-full grid-cols-[3rem_1fr_5rem] gap-2 border-b py-1 capitalize">
      <p className="text-center">{num}</p>
      <p>{name}</p>
      <p className="text-center">{currentSort}</p>
    </span>
  );
}

export default LeaderBoardRow;
