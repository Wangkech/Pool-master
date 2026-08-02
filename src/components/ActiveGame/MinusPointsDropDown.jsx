import { useGameContext } from "../../context/useGameContext";

function MinusPointsDropdown({ setIsFouling, id }) {
  const { availableBalls, recordCueScratch, recordWrongHit } = useGameContext();
  return (
    <ul className="negative-balls-container">
      {availableBalls.map((ball) => (
        <li
          key={ball.id}
          onClick={() => {
            recordWrongHit(id, ball.id);
            setIsFouling(false);
          }}
          className="positive-ball"
        >
          {ball.ballNo}
        </li>
      ))}

      <button
        onClick={() => {
          recordCueScratch(id);
        }}
      >
        Cue
      </button>
    </ul>
  );
}

export default MinusPointsDropdown;
