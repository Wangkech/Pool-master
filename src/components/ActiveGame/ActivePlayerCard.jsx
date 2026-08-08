import { useGameContext } from "../../context/useGameContext";
import DeleteBtn from "./DeleteBtn";
import PlayerNameHolder from "./PlayerNameHolder";
import PlayerPointsHolder from "./PlayerPointsHolder";
import PointsBtns from "./PointsBtns";

function ActivePlayerCard({
  name,
  score,
  id,
  basket,
  showDeletePlayer,
  balls,
}) {
  const { potBall, deletePlayer } = useGameContext();
  // const ballid = balls[7].id;
  function addPoints(playerId, ballId) {
    potBall(playerId, ballId);
  }
  return (
    <li
      key={id}
      className="player-card flex flex-col items-center justify-between shadow-[0_0_8px_8px_rgb(33,38,39,0.25)]"
    >
      {/* <p>{id}</p> */}
      <div className="player-card-top my-auto">
        <PlayerNameHolder name={name} />
        {!showDeletePlayer ? (
          <span className="points-area">
            <PlayerPointsHolder score={score} />
            <PointsBtns
              // ballId={ballid}
              addPoints={addPoints}
              balls={balls}
              potBall={potBall}
              id={id}
            />
          </span>
        ) : (
          <DeleteBtn deletePlayer={deletePlayer} id={id} />
        )}
      </div>

      <div className="player-card-bottom">
        <ul className="potted-balls-container items-center text-black">
          {basket.map((ball) => (
            <li key={crypto.randomUUID()} className="potted-ball">
              {ball.ballNo}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default ActivePlayerCard;
