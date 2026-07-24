import PropTypes from "prop-types";

import { twMerge } from "tailwind-merge";
function Actionbtn({ id, text, imgURL, style, doSome }) {
  const alt = imgURL === "" ? "" : text;
  return (
    <button
      id={id}
      onClick={doSome}
      className={twMerge(
        "action-btn {style} flex h-10 w-fit rounded-[5rem] border-2 border-white bg-[#1A1A1A] p-2 text-[0.875rem] text-white",
        style,
      )}
    >
      {imgURL != "" && <img src={imgURL} alt={alt} className=" " />}
      {text}
    </button>
  );
}

Actionbtn.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  imgURL: PropTypes.string,
};

Actionbtn.defaultProps = {
  imgURL: "",
  style: "",
  text: "",
};

export default Actionbtn;
