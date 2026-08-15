import { useState } from "react";
import { useGameContext } from "../../context/useGameContext";
import AddPointsDropDown from "./AddPointsDropdown";
import DeleteBtn from "../DeleteBtn";
import PlayerNameHolder from "./PlayerNameHolder";
import PlayerPointsHolder from "./PlayerPointsHolder";
import PointsBtns from "./PointsBtns";
import MinusPointsDropdown from "./MinusPointsDropDown";

function ActivePlayerCard({
  name,
  score,
  id,
  basket,
  showDeletePlayer,
  balls,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isFouling, setIsFouling] = useState(false);

  const { potBall, deletePlayer, availableBalls } = useGameContext();
  // const ballid = balls[7].id;
  function addPoints(playerId, ballId) {
    potBall(playerId, ballId);
  }
  return (
    <li
      key={id}
      className="flex h-auto w-full flex-col items-end justify-between gap-0 rounded-lg px-4 py-2 shadow-(--base-shadow)"
    >
      {/* <p>{id}</p> */}
      <div className="-auto relative m-0 grid h-12 w-full grid-cols-[1fr_minmax(0,8rem)] items-center gap-4">
        <PlayerNameHolder name={name} />
        {!showDeletePlayer ? (
          <span className="flex h-full items-center justify-between">
            <PlayerPointsHolder score={score} />
            <PointsBtns
              isAdding={isAdding}
              isFouling={isFouling}
              setIsAdding={setIsAdding}
              setIsFouling={setIsFouling}
              addPoints={addPoints}
              balls={balls}
              potBall={potBall}
              id={id}
            />
          </span>
        ) : (
          <DeleteBtn deletePlayer={deletePlayer} id={id} playerName={name} />
        )}
      </div>
      {isFouling && availableBalls.length > 0 && (
        <MinusPointsDropdown id={id} setIsFouling={setIsFouling} />
      )}
      {isAdding && <AddPointsDropDown id={id} setIsAdding={setIsAdding} />}
      <div className="player-card- max-h-8 max-w-[90%] self-start overflow-hidden">
        <ul className="flex max-h-8 w-auto scrollbar-none items-center gap-x-1 overflow-auto py-0.5 text-black">
          {basket.map((ball) =>
            ball.value > 0 ? (
              <li
                key={crypto.randomUUID()}
                className="potted-bal h-6 w-6 rounded-[50%] bg-white p-2 text-center text-[0.75rem]"
              >
                {ball.ballNo}
              </li>
            ) : (
              <li
                key={crypto.randomUUID()}
                className="potted-bal h-6 w-6 rounded-[50%] bg-red-400 p-2 text-center text-[0.75rem]"
              >
                {ball.ballNo}
              </li>
            ),
          )}
        </ul>
      </div>
    </li>
  );
}

export default ActivePlayerCard;
