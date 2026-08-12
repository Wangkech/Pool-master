// import react from "react";
// import propTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ActiveNavBarBtn from "./ActiveNavBarBtn";
function NavButton({ icon, text, alt, label, view, tab, setView }) {
  alt = alt ?? icon;
  return (
    <>
      <button
        onClick={() => {
          setView(tab);
        }}
        aria-label={label}
        className={`flex h-16.25 w-16.25 flex-col items-center justify-center rounded-[50%] border-none p-2 text-center text-2xl text-white ${tab === view && "bg-[#121312]"} `}
      >
        <FontAwesomeIcon
          className={`duration-300 ease-in-out ${tab === "settings" && tab === view && "rotate-180"} ${tab === "history" && tab === view && "-rotate-180"} ${tab === view && "scale-105 transition-all duration-300"} `}
          icon={tab != view ? alt : icon}
        />
        {text && <p className="text-[0.75rem] capitalize">{text}</p>}{" "}
      </button>
    </>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
