// import react from "react";
// import propTypes from "prop-types";

function NavButton({ url, text }) {
  const imgURL = url;

  return (
    <button className=" w-auto h-auto border-none p-2 text-center flex flex-col justify-between items-center  rounded-[50%]">
      <img src={imgURL} alt={text} className=" w-[30px] h-[30px]" />
      <p className="text-[0.875rem]">{text}</p>
    </button>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
