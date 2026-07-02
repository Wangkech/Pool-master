// import "react"

function Header() {
  return (
    <nav className="top-nav fixed top-0 flex h-[75px] w-full items-center justify-around bg-[#1A1A1A] bg-transparent">
      <div className="nav-content flex h-[45px] w-[90vw] items-center justify-around">
        <div className="burger-btn flex h-[2rem] w-[2rem] cursor-pointer flex-col items-center justify-around">
          <div
            className="burger-btn-line br-[25px] h-[0.25rem] w-full rounded-sm bg-white"
            id="burger-btn-line1"
          ></div>
          <div
            className="burger-btn-line br-[25px] h-[0.25rem] w-full rounded-sm bg-white"
            id="burger-btn-line2 "
          ></div>
          <div
            className="burger-btn-line br-[25px] h-[0.25rem] w-full rounded-sm bg-white"
            id="burger-btn-line3"
          ></div>
        </div>
        <div className="logo-banner w-[90%] text-center">
          <h1 className="logo mt-auto mb-auto text-center text-2xl uppercase">
            Pool Master
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Header;
