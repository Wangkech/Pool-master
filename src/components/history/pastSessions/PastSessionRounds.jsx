import PastRound from "../PastRounds/PastRound";

function PastSessionRounds({ rounds }) {
  return (
    <div className="px-4">
      {/* <div className="grid w-full grid-cols-[3rem_1fr_3rem] px-4 text-[0.75rem]">
        <p className="">no.</p> <p className="text-">name</p>{" "}
        <p className="text-center">score</p>
      </div> */}
      <div className="flex flex-col gap-y-2 bg-[#] py-1">
        {rounds.map((round) => (
          <PastRound
            players={round.players}
            roundNumber={round.roundNumber}
            winner={round.winner}
            key={round.roundID}
          />
        ))}
      </div>
    </div>
  );
}

export default PastSessionRounds;
