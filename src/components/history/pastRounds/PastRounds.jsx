import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../../context/useGameContext";
import StartNewGame from "../../StartNewGame";
import PastRound from "./PastRound";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

function PastRounds({ setIsAddingPlayers, setView }) {
  const { pastRounds, currentRoundExists } = useGameContext();

  return (
    <div
      className={`flex h-full w-full scrollbar-none flex-col gap-y-2 overflow-y-auto`}
    >
      {!pastRounds ||
        (pastRounds.length === 0 && (
          <div
            className={`flex h-full flex-col items-center justify-center gap-y-8 self-center justify-self-center`}
          >
            {currentRoundExists ? (
              <h1>
                <FontAwesomeIcon
                  className="animate-bounce"
                  icon={faLightbulb}
                />{" "}
                Finished rounds will appear here...
              </h1>
            ) : (
              <>
                {" "}
                <StartNewGame
                  setIsAddingPlayers={setIsAddingPlayers}
                  tab="home"
                  setView={setView}
                />{" "}
                <h1>
                  <FontAwesomeIcon
                    className="animate-bounce"
                    icon={faLightbulb}
                  />{" "}
                  You Haven't Played Any Games Yet
                </h1>
              </>
            )}
          </div>
        ))}
      {pastRounds && (
        <>
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
