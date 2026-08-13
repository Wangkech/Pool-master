function LeaderBoardHeader({ selectedSort }) {
  return (
    <span className="h grid w-full grid-cols-[3rem_1fr_5rem_2rem] gap-2 px-2 py-1 text-center capitalize">
      <p className="text-center">{"No"}</p>
      <p>{"name"}</p>
      <p className="text-center">{selectedSort.text}</p>
    </span>
  );
}

export default LeaderBoardHeader;
