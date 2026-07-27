import plusIcon from "../../assets/icons/Plus.svg";

function PointsBtns() {
  return (
    <div class="points-btns">
      {/* <button class="add-points-btn adding points-btn"> */}
      <button class="add-points-btn points-btn cursor-pointer">
        <img src={plusIcon} />
      </button>
      {/* <button class="minus-points-btn points-btn not-negating"> */}
      <button class="minus-points-btn points-btn cursor-pointer">
        <img src={plusIcon} alt="Deduct Points" />
      </button>
    </div>
  );
}

export default PointsBtns;
