import { faCaretSquareUp } from "@fortawesome/free-regular-svg-icons/faCaretSquareUp";
import {
  faCaretSquareDown,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PastSessionHead({
  sessionNumber,
  expandSession,
  timestamp,
  fullView,
}) {
  return (
    <div
      onClick={expandSession}
      className="h- gap grid w-full grid-cols-[3rem_4fr_1fr] px-2 py-1 text-[#5f5f5df5]"
    >
      <FontAwesomeIcon
        icon={faHistory}
        className="flext self-center justify-self-center text-2xl"
      />
      <div className="h- col-2 flex flex-col">
        <span className="bg--50 justify- grounded-2xl grid h-6 w-full grid-cols-[1fr_minmax(0,1fr)_2rem] items-center gap-1 text-[0.75rem] font-black text-gray-300">
          <p className="col-1">SESSION </p>
          <p className="col-2 px-2"> {sessionNumber}</p>
        </span>
        {!fullView && (
          // <span className="w- grid h-6 grid-cols-[1fr_minmax(0,1fr)_2rem] items-center gap-1 text-[0.75rem]">
          <span className="w- grid h-6 grid-cols-[1fr_minmax(0,0.5fr)_2rem] items-center gap-1 text-[0.75rem]">
            {timestamp && (
              <p className="flex gap-2 py-1 text-[0.75rem]">
                {`${timestamp.date}/${timestamp.month}/${timestamp.year} - ${timestamp.hour}: ${timestamp.minutes}: ${timestamp.secs}`}{" "}
              </p>
            )}
            <div className="rounded-sm bg-[#47474552] px-4 py-1 text-[0.75rem]">
              {" "}
              {/* {winner.name} */}
            </div>
            <div className="rounded-sm bg-green-800 px-2 py-1 text-[0.75rem]">
              {/* {winner.score} */}
            </div>
          </span>
        )}
      </div>
      <span className="col-4 flex h-full items-center justify-end px-4">
        {fullView && (
          <FontAwesomeIcon className="text-[#797977]" icon={faCaretSquareUp} />
        )}
        {!fullView && (
          <FontAwesomeIcon
            className="text-[#474745]"
            icon={faCaretSquareDown}
          />
        )}
      </span>
    </div>
  );
}

export default PastSessionHead;
