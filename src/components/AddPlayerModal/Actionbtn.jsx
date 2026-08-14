// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { twMerge } from "tailwind-merge";
function Actionbtn({ id, text, style, action }) {
  return (
    <button
      id={id}
      onClick={action}
      className={twMerge(
        "action-btn {style} flex items-center justify-center rounded-lg border-2 border-white bg-[#1A1A1A] p-2 text-center text-[0.875rem] text-white",

        style,
      )}
    >
      {/* <FontAwesomeIcon icon={icon} /> */}
      {/* {imgURL != "" && <img src={imgURL} alt={alt} className=" " />} */}
      {text}
    </button>
  );
}

export default Actionbtn;
