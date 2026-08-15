import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../../context/useGameContext";
import PastSession from "./PastSession";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

function PastSessions() {
  const { pastSessions } = useGameContext();
  return (
    <ul className="flex h-full w-full scrollbar-none flex-col gap-y-2 overflow-y-auto rounded-2xl">
      {!pastSessions ||
        (pastSessions.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-y-8 self-center justify-self-center">
            <h1 className="text-center">
              {" "}
              <FontAwesomeIcon
                className="animate-bounce"
                icon={faLightbulb}
              />{" "}
              Saved sessions history will appear here...
            </h1>
          </div>
        ))}
      {pastSessions &&
        pastSessions.map((session) => (
          <PastSession
            timestamp={session.timestamp}
            key={session.sessionID}
            // winner={round.winner}
            rounds={session.rounds}
            sessionNumber={session.sessionNumber}
          />
        ))}
    </ul>
  );
}

export default PastSessions;
