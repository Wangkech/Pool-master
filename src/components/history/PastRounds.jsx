import { useGameContext } from "../../context/useGameContext";
import StartNewGame from "../StartNewGame";
import PastRound from "./PastRound";

function PastRounds() {
  const { pastRounds, currentGameExists } = useGameContext();
  console.log(pastRounds);
  console.log(currentGameExists);

  return (
    <div className="flex w-full scrollbar-none flex-col gap-y-2 overflow-y-auto">
      {pastRounds.length === 0 && (
        <div className="h-full self-center justify-self-center">
          <h1>You Haven't Played Any Games Yet</h1>
          {currentGameExists && <h1>You Haven't Played Any Games Yet</h1>}
          {!currentGameExists && <StartNewGame />}
        </div>
      )}
      {pastRounds &&
        pastRounds.map((round) => (
          <PastRound
            key={round.roundID}
            winner={round.winner}
            players={round.players}
            roundNumber={round.roundNumber}
          />
        ))}
    </div>
  );
}

export default PastRounds;
