function LeaderBoardHeader({ selectedSort }) {
  return (
    <span className="overflow-xl-auto h- grid w-full grid-cols-[3rem_1fr_5rem] gap-2 border-b py-1 text-center capitalize">
      <p className="text-center">{"No"}</p>
      <p>{"name"}</p>
      <p className="text-center">{selectedSort.text}</p>
    </span>
  );
}

export default LeaderBoardHeader;
