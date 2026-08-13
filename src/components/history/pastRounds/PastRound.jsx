import { useState } from "react";
import PastRoundHead from "./PastRoundHead";
import PastRoundPlayers from "./PastRoundPlayers";

function PastRound({ winner, players, roundNumber }) {
  const [fullView, setFullView] = useState(null);
  function openTable() {
    if (!fullView) {
      setFullView(true);
    } else {
      setFullView(false);
    }
  }
  return (
    <li
      className={`flex flex-col justify-between gap-y-2 rounded-2xl bg-[#161616] px-4 py-2`}
    >
      <PastRoundHead
        openTable={openTable}
        winner={winner}
        roundNumber={roundNumber}
        fullView={fullView}
      />

      <PastRoundPlayers
        fullView={fullView}
        winnerId={winner.id}
        players={players}
      />
    </li>
  );
}

export default PastRound;
