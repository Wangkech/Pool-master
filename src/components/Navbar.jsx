// import homeIcon from "../assets/icons/Home.svg";
// import historyIcon from "../assets/icons/History.svg";
// import gearIcon from "../assets/icons/gear.svg";
import { faHouse, faHistory, faGear } from "@fortawesome/free-solid-svg-icons";
// import { faHouse } from "@fortawesome/free-regular-svg-icons";

import NavButton from "./NavButton.jsx";
function Navbar({ setView }) {
  return (
    <nav
      aria-label="navigation"
      className="bottom-nav shadow] row-3 flex w-[80vw] items-center justify-evenly self-center justify-self-center rounded-[5rem] bg-(--accent-bg) bg-blend-color shadow"
    >
      <NavButton icon={faHouse} label={"Home"} setView={setView} view={'home'} /*text="Home"*/ />
      <NavButton
        icon={faHistory}
        label={"history"}
        setView={setView}
        view={'history'}
      /*text="records"*/
      />
      <NavButton icon={faGear} label={"settings"} /*text="settings"*/ />

      {/* <button className="home-btn ">home</button>
      <button className="records-btn">records</button>
      <button className="settings-btn
      ">settings</button> */}
    </nav>
  );
}

export default Navbar;
