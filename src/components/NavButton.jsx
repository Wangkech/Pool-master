// import react from "react";
// import propTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
function NavButton({ icon, url, text }) {
  // const imgURL = url;

  return (
    <Link
      to={url}
      className="flex h-16.25 w-16.25 flex-col items-center justify-center rounded-[50%] border-none p-2 text-center text-2xl text-white"
    >
      <FontAwesomeIcon icon={icon} />
      {/* <img src={imgURL} alt={text} className="h-[30px] w-[30px]" /> */}
      {text && <p className="text-[0.75rem] capitalize">{text}</p>}{" "}
    </Link>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
