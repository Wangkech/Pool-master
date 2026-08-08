import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PastRound({ winner, players, roundNumber }) {
  return (
    <li className="flex flex-col gap-y-2 rounded-2xl bg-[#161616] p-4">
      <span>
        <p>Round {roundNumber}</p>
      </span>

      <p className="uppercase">
        <FontAwesomeIcon icon={faCrown} className="text-amber-300" />{" "}
        {winner.name}{" "}
      </p>

      <div className="flex flex-col">
        {players.map((player, index) => (
          <span
            key={player.id}
            className="grid w-[70%] grid-cols-[2rem_1fr_2rem]"
          >
            <p> {index + 1}</p> <p>{player.name} </p>
            <p>{player.state.score}</p>
          </span>
        ))}
      </div>
    </li>
  );
}

export default PastRound;
