import { useState } from "react";
import AddPointsDropdown from "./AddPointsDropdown";
import MinusPointsDropdown from "./MinusPointsDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function PointsBtns({ id }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isFouling, setIsFouling] = useState(false);
  const handlePlusbtn = () => {
    if (isAdding) {
      setIsAdding(false);
    } else {
      setIsAdding(true);
    }
  };
  const handleMinusBtn = () => {
    if (!isFouling) {
      setIsFouling(true);
    } else {
      setIsFouling(false);
    }
  };
  return (
    <div className="points-btns">
      <FontAwesomeIcon
        icon={faPlusCircle}
        onClick={handlePlusbtn}
        className="points-btn relative cursor-pointer text-[#3f813f]"
      />
      <FontAwesomeIcon
        icon={faMinusCircle}
        onClick={handleMinusBtn}

        className="minus-points-btn points-btn relative cursor-pointer text-[#a12626]"
      />
      {isAdding && <AddPointsDropdown id={id} setIsAdding={setIsAdding} />}
      {isFouling && <MinusPointsDropdown id={id} setIsFouling={setIsFouling} />}
    </div>
  );
}

export default PointsBtns;
