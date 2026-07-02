// import react from "react";
// import propTypes from "prop-types";

function NavButton({ url, text }) {
  const imgURL = url;

  return (
    <button className="flex h-[65px] w-[65px] flex-col items-center justify-between rounded-[50%] border-none p-2 text-center">
      <img src={imgURL} alt={text} className="h-[30px] w-[30px]" />
      <p className="text-[0.875rem] capitalize">{text}</p>
    </button>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
