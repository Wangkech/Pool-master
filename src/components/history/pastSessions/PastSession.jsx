import { useState } from "react";
import PastSessionHead from "./PastSessionHead";
import PastSessionRounds from "./PastSessionRounds";

function PastSession({ sessionNumber, rounds }) {
  const [fullView, setFullView] = useState(false);
  function expandSession() {
    if (fullView) {
      setFullView(false);
    } else {
      setFullView(true);
    }
  }
  return (
    <li className="rounded-2xl bg-(--accent-bg)">
      <PastSessionHead
        sessionNumber={sessionNumber}
        expandSession={expandSession}
        fullView={fullView}
      />
      {fullView && <PastSessionRounds rounds={rounds} />}
    </li>
  );
}

export default PastSession;
