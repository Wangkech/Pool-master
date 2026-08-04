// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import { twMerge } from "tailwind-merge";
function Actionbtn({ id, text, imgURL, style, action }) {
  const alt = imgURL === "" ? "" : text;
  return (
    <button
      id={id}
      onClick={action}
      className={twMerge(
        "action-btn {style} flex rounded-[5rem] border-2 border-white bg-[#1A1A1A] p-2 text-center text-[0.875rem] text-white",

        style,
      )}
    >
      {/* <FontAwesomeIcon icon={icon} /> */}
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
