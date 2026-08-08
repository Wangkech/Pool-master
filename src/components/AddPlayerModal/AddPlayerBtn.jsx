import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddPlayerBtn({ addPlayer }) {
  return (
    <button
      onClick={addPlayer}
      type="submit"
      className="flex h-10 w-10 items-center justify-center rounded-[5rem] bg-[--primary-bg] p-2 text-center text-[1rem] text-white shadow-[0_0_8px_2px_rgba(88,88,88,0.5)]"
    >
      <FontAwesomeIcon icon={faUserPlus} />
    </button>
  );
}

export default AddPlayerBtn;
