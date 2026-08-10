import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PastRoundPlayers({ players, winnerId }) {
  return (
    <div className="">
      <div className="grid w-full grid-cols-[3rem_1fr_3rem] px-4 text-[0.75rem]">
        <p className="">no.</p> <p className="text-">name</p>{" "}
        <p className="text-center">score</p>
      </div>
      <div className="flex flex-col gap-y-2 bg-[#] py-1">
        {players.map((player, index) => (
          <span
            key={player.id}
            className="grid grid-cols-[3rem_1fr_3rem] rounded-l bg-[#272525] px-4 py-2 text-[0.75rem]"
          >
            <p className="col-1"> {index + 1}</p>{" "}
            <p className="col-2 grid grid-cols-[1fr_3rem]">
              {player.name}{" "}
              {winnerId === player.id && (
                <FontAwesomeIcon className="text-amber-300" icon={faCrown} />
              )}{" "}
            </p>
            <p className="col-3 text-center">{player.state.score}</p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PastRoundPlayers;
