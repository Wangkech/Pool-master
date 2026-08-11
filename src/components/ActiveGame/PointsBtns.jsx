import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useGameContext } from "../../context/useGameContext";

function PointsBtns({ isAdding, setIsAdding, isFouling, setIsFouling }) {
  const { availableBalls } = useGameContext();
  const handlePlusbtn = () => {
    if (availableBalls.length === 0) return;
    if (isFouling) {
      setIsFouling(false);
      setIsAdding(true);
    }
    if (isAdding) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };
  const handleMinusBtn = () => {
    if (availableBalls.length === 0) return;
    if (isAdding) {
      setIsAdding(false);
      setIsFouling(true);
    }
    if (isFouling) {
      setIsFouling(false);
    } else {
      setIsFouling(true);
    }
  };
  return (
    <div className="points-btns w-ful bg-green-8d00 h-full rounded-t-2xl">
      {isAdding ? (
        <div className="flex h-full items-center rounded-t-2xl bg-green-800">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handlePlusbtn}
            className="points-btn relative cursor-pointer text-[#3f813f]"
          />
        </div>
      ) : (
        <div className="bg-green-none flex h-full items-center rounded-t-2xl">
          <FontAwesomeIcon
            icon={faPlusCircle}
            onClick={handlePlusbtn}
            className="points-btn relative cursor-pointer text-green-800"
          />
        </div>
      )}
      {isFouling ? (
        <div className="z-10 flex h-full items-center rounded-t-2xl bg-red-950">
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleMinusBtn}

            className="minus-points-btn points-btn relative cursor-pointer text-[#a12626]"
          />
        </div>
      ) : (
        <div className="z-10 flex h-full items-center rounded-t-2xl bg-none">
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={handleMinusBtn}

            className="minus-points-btn points-btn relative cursor-pointer text-[#fff]"
          />
        </div>
      )}
    </div>
  );
}

export default PointsBtns;
