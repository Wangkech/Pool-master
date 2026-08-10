import { faCaretSquareUp } from "@fortawesome/free-regular-svg-icons/faCaretSquareUp";
import { faCaretSquareDown, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PastRoundHead({ roundNumber, winner, openTable, fullView }) {
  return (
    <div
      onClick={openTable}
      className="h- gap grid w-full grid-cols-[1fr_5rem] px-4 py-1"
    >
      <div className="h- flex flex-col">
        <span className="bg--50 justify- grid h-6 w-[calc(100%-5rem)] grid-cols-[5rem_auto] items-center gap-4 rounded-2xl text-[0.75rem] font-black text-white">
          <p className="col-1">ROUND </p>
          <p className="col-2"> {roundNumber}</p>
        </span>
        {!fullView && (
          <span className="w- grid h-6 grid-cols-[5rem_minmax(0,8rem)_2rem] items-center gap-2 text-[0.75rem]">
            <p className="flex gap-2 py-1 text-[0.75rem]">
              <FontAwesomeIcon
                icon={faCrown}
                className="text-[1rem] text-amber-300"
              />
              Winner:{" "}
            </p>
            <p className="rounded-sm bg-[#47474552] px-4 py-1 text-[0.75rem]">
              {" "}
              {winner.name}
            </p>
            <p className="rounded-sm bg-green-800 px-2 py-1 text-[0.75rem]">
              {winner.score}
            </p>
          </span>
        )}
      </div>
      <span className="col-2 flex h-full items-center justify-end px-4">
        {!fullView && (
          <FontAwesomeIcon className="text-[#797977]" icon={faCaretSquareUp} />
        )}
        {fullView && (
          <FontAwesomeIcon
            className="text-[#474745]"
            icon={faCaretSquareDown}
          />
        )}
      </span>
    </div>
  );
}

export default PastRoundHead;
