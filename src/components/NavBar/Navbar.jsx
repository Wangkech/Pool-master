// import homeIcon from "../assets/icons/Home.svg";
// import historyIcon from "../assets/icons/History.svg";
// import gearIcon from "../assets/icons/gear.svg";
import {
  faHistory,
  faGear,
  faRankingStar,
  faHouse as houseSolid,
  // faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  //  faHistory
} from "@fortawesome/free-regular-svg-icons";

import NavButton from "./NavButton.jsx";
function Navbar({ setView, view }) {
  return (
    <nav
      aria-label="navigation"
      className="bottom-nav shadow] row-3 flex w-[90vw] items-center justify-evenly self-center justify-self-center rounded-[5rem] bg-(--accent-bg) py-1.5 bg-blend-color shadow-(--base-shadow) md:w-3xl"
    >
      {/* <NavButton icon={faUserGroup} label={"rankings"} /> */}
      <NavButton
        alt={faHouse}
        icon={houseSolid}
        label={"Home"}
        setView={setView}
        tab={"home"} /*text="Home"*/
        view={view}
      />

      <NavButton
        // alt={}
        icon={faHistory}
        label={"history"}
        setView={setView}
        tab={"history"}
        view={view}

        /*text="records"*/
      />
      <NavButton
        icon={faRankingStar}
        label={"ranking"}
        setView={setView}
        tab={"ranking"}
        view={view} /*text="settings"*/
      />
      <NavButton
        setView={setView}
        tab={"settings"}
        view={view}
        icon={faGear}
        label={"settings"} /*text="settings"*/
      />

      {/* <button className="home-btn ">home</button>
      <button className="records-btn">records</button>
      <button className="settings-btn
      ">settings</button> */}
    </nav>
  );
}

export default Navbar;
