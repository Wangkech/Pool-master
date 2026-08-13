import { useGameContext } from "../../../context/useGameContext";
import StartNewGame from "../../StartNewGame";
import PastRound from "./PastRound";

function PastRounds({ setIsAddingPlayers, setView }) {
  const { pastRounds, currentRoundExists } = useGameContext();

  return (
    <div className="flex h-full w-full scrollbar-none flex-col gap-y-2 overflow-y-auto">
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
      {pastRounds && (
        <>
          <div className="grid h-24 w-full grid-cols-3 gap-4 px-2">
            <span className="flex h-full flex-col rounded-2xl bg-(--accent-bg) p-2 text-center shadow-(--base-shadow)">
              <p className="text-2xl">{pastRounds.length}</p>
              <p className="text-xs">RNDs</p>
            </span>
            <span className="flex h-full flex-col rounded-2xl bg-(--accent-bg) p-2 text-center shadow-(--base-shadow)">
              <p className="text-2xl">{pastRounds.length}</p>
              <p className="text-xs">best Score.</p>
            </span>
            <span className="flex h-full flex-col rounded-2xl bg-(--accent-bg) p-2 text-center shadow-(--base-shadow)">
              <p className="text-2xl">{pastRounds.length}</p>
              <p className="text-xs">top wins</p>
            </span>
          </div>
          {pastRounds.map((round) => (
            <PastRound
              key={round.roundID}
              winner={round.winner}
              players={round.players}
              roundNumber={round.roundNumber}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PastRounds;
