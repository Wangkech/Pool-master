import NavButton from "./NavButton.jsx";
function Navbar() {
  return (
    <div className="bottom-nav fixed bottom-[1rem] w-[70vw] h-[75px] bg-[#1A1A1A] justify-self-center flex justify-evenly items-center border-2 border-white rounded-4xl">
      <NavButton url="./src/assets/icons/Home.svg" text="Home" />
      <NavButton url="./src/assets/icons/History.svg" text="records" />
      <NavButton url="./src/assets/icons/gear.svg" text="settings" />

      {/* <button className="home-btn ">home</button>
      <button className="records-btn">records</button>
      <button className="settings-btn
      ">settings</button> */}
    </div>
  );
}

export default Navbar;
