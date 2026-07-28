import homeIcon from "../assets/icons/Home.svg";
import historyIcon from "../assets/icons/History.svg";
import gearIcon from "../assets/icons/gear.svg";

import NavButton from "./NavButton.jsx";
function Navbar() {
  return (
    <div className="bottom-nav shadow] fixed bottom-2 flex h-18.75 w-[80vw] items-center justify-evenly justify-self-center rounded-[5rem] bg-[#1A1A1A] bg-blend-color shadow">
      <NavButton url={homeIcon} text="Home" />
      <NavButton url={historyIcon} text="records" />
      <NavButton url={gearIcon} text="settings" />

      {/* <button className="home-btn ">home</button>
      <button className="records-btn">records</button>
      <button className="settings-btn
      ">settings</button> */}
    </div>
  );
}

export default Navbar;
