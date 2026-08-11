import { useGameContext } from "../../context/useGameContext";
import StartNewGame from "../StartNewGame";
import PastRound from "./PastRound";

function PastRounds({ setIsAddingPlayers, screens, setView }) {
  const { pastRounds, currentRoundExists } = useGameContext();

  return (
    <ul className="flex h-full w-full scrollbar-none flex-col gap-y-2 overflow-y-auto">
      {!pastRounds ||
        (pastRounds.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-y-8 self-center justify-self-center">
            {currentRoundExists ? (
              <h1>Finished rounds will appear here...</h1>
            ) : (
              <>
                {" "}
                <h1>You Haven't Played Any Games Yet</h1>
                <StartNewGame
                  setIsAddingPlayers={setIsAddingPlayers}
                  tab="home"
                  setView={setView}
                />{" "}
              </>
            )}
          </div>
        ))}
      {pastRounds &&
        pastRounds.map((round) => (
          <PastRound
            key={round.roundID}
            winner={round.winner}
            players={round.players}
            roundNumber={round.roundNumber}
          />
        ))}
    </ul>
  );
}

export default PastRounds;
