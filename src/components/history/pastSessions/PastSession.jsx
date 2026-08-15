import { useState } from "react";
import PastSessionHead from "./PastSessionHead";
import PastSessionRounds from "./PastSessionRounds";

function PastSession({ sessionNumber, rounds, timestamp }) {
  const [fullView, setFullView] = useState(false);
  function expandSession() {
    if (fullView) {
      setFullView(false);
    } else {
      setFullView(true);
    }
  }
  return (
    <li className="rounded-lg bg-(--accent-bg) py-2">
      <div className="h-full w-full">
        <PastSessionHead
          timestamp={timestamp}
          sessionNumber={sessionNumber}
          expandSession={expandSession}
          fullView={fullView}
        />
        {fullView && <PastSessionRounds rounds={rounds} />}
      </div>
    </li>
  );
}

export default PastSession;
