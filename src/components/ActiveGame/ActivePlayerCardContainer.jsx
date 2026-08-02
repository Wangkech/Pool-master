import PlayerNameHolder from "./PlayerNameHolder";
import PlayerPointsHolder from "./PlayerPointsHolder";
import PointsBtns from "./PointsBtns";

function ActivePlayerCard() {
  return (
    <li class="player-card flex flex-col items-center justify-between shadow-[0_0_8px_8px_rgb(33,38,39,0.25)]">
      <div class="player-card-top my-auto">
        <PlayerNameHolder name={name} />
        <span class="points-area">
          <PlayerPointsHolder />
          <PointsBtns />
        </span>
      </div>

      <div class="player-card-bottom">
        <ul class="potted-balls-container items-center text-black">
          <li class="potted-ball"></li>

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
    </li>
  );
}

export default ActivePlayerCard;
