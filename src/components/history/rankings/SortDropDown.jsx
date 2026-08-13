import { faSortAmountAsc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGameContext } from "../../../context/useGameContext";

function SortDropDown({ selectedSort, setSelectedSort, OPTIONS }) {
  const { sortPlayerStarts } = useGameContext();

  return (
    <div className="row-1 flex w-full items-end justify-end gap-x-2 py-2">
      <FontAwesomeIcon icon={faSortAmountAsc} />
      <select
        defaultValue={selectedSort.value}
        onChange={(e) => {
          sortPlayerStarts(e.target.value);
          setSelectedSort(
            OPTIONS.find((option) => option.value === e.target.value),
          );
        }}
        className="rounded-t-lg bg-(--accent-bg) px-1 text-sm capitalize"
      >
        {OPTIONS.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropDown;
