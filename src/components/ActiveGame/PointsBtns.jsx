import { useState } from "react";
import AddPointsDropdown from "./AddPointsDropdown";
import MinusPointsDropdown from "./MinusPointsDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function PointsBtns({ id }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isFouling, setIsFouling] = useState(false);
  const [timeout, settimeout] = useState(5000);
  const handlePlusbtn = () => {
    console.log("Clicked plus");
    console.log(isAdding);

    if (isAdding) {
      setIsAdding(false);
      console.log("set Plus off");
      console.log(isAdding);
    } else {
      console.log("set Plus on");
      console.log(isAdding);

      setIsAdding(true);
    }
  };
  const handleMinusBtn = () => {
    console.log("Clicked minus");
    // console.log(e.target);

    if (!isFouling) {
      setIsFouling(true);
    } else {
      setIsFouling(false);
    }
  };
  window.addEventListener("click", (e) => {
    if (!e.target.parentElement.classList.contains("points-btn")) {
      console.log(e.target.parentElement.classList);

      setIsAdding(false);
      setIsFouling(false);
    }
  });
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
      {isAdding && (
        <AddPointsDropdown
          settimeout={settimeout}
          id={id}
          setIsAdding={setIsAdding}
        />
      )}
      {isFouling && <MinusPointsDropdown id={id} setIsFouling={setIsFouling} />}
    </div>
  );
}

export default PointsBtns;
