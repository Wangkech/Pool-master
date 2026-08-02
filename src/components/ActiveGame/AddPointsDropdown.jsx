import { useGameContext } from "../../context/useGameContext";

function AddPointsDropDown({ id, setIsAdding }) {
  const { addPoints, availableBalls } = useGameContext();
  return (
    <ul className="positive-balls-container">
      {availableBalls.map((ball) => (
        <li
          key={ball.id}
          onClick={() => {
            addPoints(id, ball.id);
            setIsAdding(false);
          }}
          className="positive-ball"
        >
          {ball.ballNo}
        </li>
      ))}
    </ul>
  );
}

export default AddPointsDropDown;
