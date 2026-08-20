import PastRound from "../pastRounds/PastRound";

function PastSessionRounds({ rounds }) {
  return (
    <div className="px-4">
      <ul className="flex flex-col gap-y-2 bg-[#] py-1">
        {rounds.map((round) => (
          <PastRound
            players={round.players}
            roundNumber={round.roundNumber}
            winner={round.roundWinner}
            key={round.roundID}
          />
        ))}
      </ul>
    </div>
  );
}

export default PastSessionRounds;
