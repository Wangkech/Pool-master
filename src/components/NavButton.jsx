// import react from "react";
// import propTypes from "prop-types";

function NavButton({ url, text }) {
  const imgURL = url;

  return (
    <button className="  ">
      <img src={imgURL} alt={text} />
      <p>{text}</p>
    </button>
  );
}

// NavButton.propTypes = {
//   url: propTypes.string,
//   text: propTypes.string.isRequired,
//   //   onClick: propTypes.func,
// };

export default NavButton;
