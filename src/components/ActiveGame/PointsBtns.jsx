import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useGameContext } from "../../context/useGameContext";
import useDialog from "../../context/useDialog";
import { useEffect } from "react";

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
  const { alert } = useDialog();

  async function noBallsAlert() {
    await alert({
      title: "No Available Balls",
      message: "All balls have been potted!",
      type: "info",
      onAction: [() => {}],
      actionText: "OK",
    });
  }

  useEffect(() => {
    if (availableBalls.length === 0) {
      setIsFouling(false);
      setIsFouling(false);
    }
  }, [availableBalls]);
  return (
    <div className="points-btns w-ful bg-green-8d00 h-full rounded-t-2xl">
      <div
        className={`bg-green-none flex h-full items-center rounded-t-2xl ${isAdding && "rounded-t-2xl bg-green-800 "}`}
      >
        <FontAwesomeIcon
          onClick={() => {
            if (availableBalls.length === 0) {
              noBallsAlert();
            }
            handlePlusbtn();
          }}
          icon={isAdding ? faTimes : faPlusCircle}
          className={`points-btn relative cursor-pointer ${isAdding ? "text-[#3f813f]" : "text-green-800"}`}
        />
      </div>
      <div
        className={`z-10 flex h-full items-center bg-none ${isFouling && "rounded-t-2xl bg-red-950"}`}
      >
        <FontAwesomeIcon
          icon={isFouling ? faTimes : faMinusCircle}
          onClick={() => {
            if (availableBalls.length === 0) {
              noBallsAlert();
            }
            handleMinusBtn();
          }}
          className={`minus-points-btn points-btn relative cursor-pointer ${isFouling ? " text-[#a12626]" : "text-white"}`}
        />
      </div>
      {/* )} */}
    </div>
  );
}

export default PointsBtns;
