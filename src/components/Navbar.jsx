import NavButton from "./NavButton.jsx";
function Navbar() {
  return (
    <div className="bottom-nav shadow] fixed bottom-2 flex h-18.75 w-[80vw] items-center justify-evenly justify-self-center rounded-[5rem] bg-[#1A1A1A] bg-blend-color shadow">
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
