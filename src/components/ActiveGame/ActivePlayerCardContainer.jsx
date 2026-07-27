import PlayerNameHolder from "./PlayerNameHolder";
import PlayerPointsHolder from "./PlayerPointsHolder";
import PointsBtns from "./PointsBtns";

function ActivePlayerCard({ name, score, ballBasket }) {
  return (
    <li class="player-card flex flex-col items-center justify-between shadow-[0_0_8px_8px_rgb(33,38,39,0.25)]">
      <div class="player-card-top my-auto">
        <PlayerNameHolder name={name} />
        <span class="points-area">
          <PlayerPointsHolder score={score} />
          <PointsBtns />
        </span>
      </div>
      {ballBasket.length === 0 && (
        <div class="player-card-bottom">
          <ul class="potted-balls-container items-center text-black">
            {ballBasket.map((ball) => (
              <li key={ball.id} class="potted-ball">
                {ball.number}
              </li>
            ))}

            <li class="potted-ball">5</li>
            <li class="potted-ball">5</li>
            <li class="potted-ball">5</li>
            {/* <li class="potted-ball">5</li>
          <li class="potted-ball">12</li>
          <li class="potted-ball">5</li>
          <li class="potted-ball">5</li>
          <!-- <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li>
                            <li class="potted-ball">5</li> --> 
          <li class="potted-ball">5</li>
          <li class="potted-ball">5</li>
          <li class="potted-ball">5</li> */}
          </ul>
        </div>
      )}
    </li>
  );
}

export default ActivePlayerCard;
