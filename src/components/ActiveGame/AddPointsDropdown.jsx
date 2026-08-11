import { useGameContext } from "../../context/useGameContext";

function AddPointsDropDown({ id, setIsAdding }) {
  const { addPoints, availableBalls } = useGameContext();
  return (
    <div className="h-a py- grid w-full grid-cols-[1fr_minmax(0,10rem)] gap-4">
      <ul className="b-[49494b] col-2 grid grid-cols-3 gap-3 rounded-2xl bg-green-800 p-2 shadow-(--base-shadow)">
        {availableBalls.map((ball) => (
          <li
            key={ball.id}
            onClick={() => {
              addPoints(id, ball.id);
              setIsAdding(false);
            }}
            className="positve-ball h-10 w-10 rounded-[50%] text-center text-sm shadow-(--base-shadow)"
          >
            {ball.ballNo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddPointsDropDown;
