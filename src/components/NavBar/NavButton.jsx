// import react from "react";
// import propTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActiveNavBarBtn from "./ActiveNavBarBtn";
function NavButton({ icon, text, alt, label, view, tab, setView }) {
  // const imgURL = url;
  alt = alt ?? icon;
  return (
    <>
      {tab != view && (
        <button
          onClick={() => {
            setView(tab);
          }}
          aria-label={label}
          className="flex h-16.25 w-16.25 flex-col items-center justify-center rounded-[50%] border-none p-2 text-center text-2xl text-white"
        >
          <FontAwesomeIcon icon={alt} />
          {/* <img src={imgURL} alt={text} className="h-[30px] w-[30px]" /> */}
          {text && <p className="text-[0.75rem] capitalize">{text}</p>}{" "}
        </button>
      )}
      {tab === view && (
        <ActiveNavBarBtn
          icon={icon}
          label={label}
          tab={tab}
          setView={setView}
        />
      )}
    </>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
