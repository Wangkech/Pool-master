// import homeIcon from "../assets/icons/Home.svg";
// import historyIcon from "../assets/icons/History.svg";
// import gearIcon from "../assets/icons/gear.svg";
import { faHouse, faHistory, faGear } from "@fortawesome/free-solid-svg-icons";
// import { faHouse } from "@fortawesome/free-regular-svg-icons";

import NavButton from "./NavButton.jsx";
function Navbar() {
  return (
    <div className="bottom-nav shadow] -evenly fixed bottom-2 flex w-[80vw] items-center justify-evenly self-center justify-self-center rounded-[5rem] bg-(--accent-bg) bg-blend-color shadow">
      <NavButton icon={faHouse} /*text="Home"*/ url={"/"} />
      <NavButton icon={faHistory} /*text="records"*/ url={"/history"} />
      <NavButton icon={faGear} /*text="settings"*/ />

      {/* <button className="home-btn ">home</button>
      <button className="records-btn">records</button>
      <button className="settings-btn
      ">settings</button> */}
    </div>
  );
}

export default Navbar;
