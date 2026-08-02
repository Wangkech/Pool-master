import { useGameContext } from "../../context/useGameContext";

function PlayerNameList({ editPlayerName, removePlayer, ref }) {
  const { playerList } = useGameContext();
  return (
    <ul
      ref={ref}
      className="list grid h-auto scrollbar-none grid-rows-[repeat(auto,minmax(0,50px))] gap-2 overflow-x-auto p-2"
    >
      {playerList.map((player, index) => (
        <li
          key={player.id}
          className="my-auto grid h-12 w-full grid-cols-[150px_1fr_1fr] items-center justify-around"
        >
          <span className="grid grid-cols-[1.25rem_1fr] items-center gap-x-4">
            <p className="py-auto w-auto rounded-[50%] bg-white text-center text-[0.785rem] font-bold break-all text-black">
              {index + 1}
            </p>
            <p> {player.name}</p>
          </span>
          <button onClick={() => editPlayerName(player.id)}>edit</button>
          <button onClick={() => removePlayer(player.id)}>del</button>
        </li>
      ))}
    </ul>
  );
}

export default PlayerNameList;
