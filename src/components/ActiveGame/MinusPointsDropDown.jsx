import { useGameContext } from "../../context/useGameContext";

function MinusPointsDropdown({ setIsFouling, id }) {
  const { availableBalls, recordCueScratch, recordWrongHit } = useGameContext();

  return (
    <div className="h-a grid w-full grid-cols-[1fr_minmax(0,11rem)] gap-4 py-0">
      <div className="col-2 grid grid-rows-[auto_1.5rem] gap-2 rounded-2xl rounded-tr-none bg-red-950 p-2 shadow-(--base-shadow)">
        <div className="col- grid grid-cols-4 gap-3">
          {availableBalls.map((ball) => (
            <span
              key={ball.id}
              onClick={() => {
                recordWrongHit(id, ball.id);
                setIsFouling(false);
              }}
              className="positive- z-20 h-8 w-8 rounded-[50%] py-2 text-center text-xs shadow-(--base-shadow)"
            >
              {ball.ballNo * -1}
            </span>
          ))}
        </div>

        <button
          className="row-2 w-full rounded-2xl bg-amber-50 text-sm text-red-600 shadow-(--base-shadow)"
          onClick={() => {
            recordCueScratch(id);
          }}
        >
          white ball
        </button>
      </div>
    </div>
  );
}

export default MinusPointsDropdown;
