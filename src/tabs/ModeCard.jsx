import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModeCard({ clickHandler, icon, text, badge }) {
  return (
    <button
      onClick={clickHandler}
      className="w- -white shadlow-(--base-shadow) shdadow-[0px_0px_8px_8px_rgba(46,46,46,0.25)] relative flex h-40 flex-col items-center justify-center rounded-2xl border-[0.5px] border-(--accent-bg) bg-(--primary-bg) p-10 text-right bg-blend-color shadow-(--base-shadow)"
    >
      <div className="relative top-0 w-20">
        {/* <p className="rounded bg-green-800 p-1 text-right text-xs">{badge}</p> */}
      </div>
      <div className="shadow- shado) p- accent-bg) py- flex w-full items-center justify-center rounded-2xl border-[0.5px] border-(--accent-bg) bg-(--primary-bg) py-4 text-center text-white">
        <FontAwesomeIcon className="text-2xl" icon={icon} />
      </div>
      <p className="bg--accent-bg) shadow-[] shadowamber-50 sbg-white rounded-b-2xl px-2 py-4 text-center">
        {text}
      </p>
    </button>
  );
}

export default ModeCard;
