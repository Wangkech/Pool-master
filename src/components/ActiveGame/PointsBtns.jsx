import { useState } from "react";
import AddPointsDropdown from "./AddPointsDropdown";
import MinusPointsDropdown from "./MinusPointsDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function PointsBtns({ id }) {
  const [isAdding, setIsAdding] = useState(null);
  const [isFouling, setIsFlouling] = useState(null);
  const [timeout, settimeout] = useState(5000);
  window.addEventListener("click", (e) => {
    if (!e.target.parentElement.classList.contains("points-btn")) {
      setIsAdding(false);
      setIsFlouling(false);
    }
  });
  return (
    <div className="points-btns">
      {/* <button className="add-points-btn adding points-btn"> */}
      <button
        onClick={() => {
          if (isAdding) {
            setIsAdding(false);
          } else {
            setIsAdding(true);
            // setTimeout(() => {
            //   setIsAdding(false);
            // }, );
          }
        }}
        className="add-points-btn points-btn flex cursor-pointer items-center justify-center text-[#3f813f]"
      >
        <FontAwesomeIcon icon={faPlusCircle} />

        {/* <img src={plusIcon} /> */}
      </button>
      {/* <button className="minus-points-btn points-btn not-negating"> */}
      <button
        onClick={() => {
          if (!isFouling) {
            setIsFlouling(true);
            // setTimeout(() => {
            //   setIsFlouling(false);
            // }, timeout);
          } else {
            setIsFlouling(false);
          }
        }}
        className="minus-points-btn points-btn flex cursor-pointer items-center justify-center text-[#a12626]"
      >
        <FontAwesomeIcon icon={faMinusCircle} />
        {/* <img src={plusIcon} alt="Deduct Points" /> */}
      </button>
      {isAdding && (
        <AddPointsDropdown
          settimeout={settimeout}
          id={id}
          setIsAdding={setIsAdding}
        />
      )}
      {isFouling && (
        <MinusPointsDropdown id={id} setIsFouling={setIsFlouling} />
      )}
    </div>
  );
}

export default PointsBtns;
