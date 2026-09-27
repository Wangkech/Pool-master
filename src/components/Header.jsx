// import "react"
import logoInWhite from "../assets/images/logo-white-no-bg.svg";
function Header() {
  return (
    <header
      aria-label="header"
      className="top-nav row-1 flex h-18.75 w-full items-center justify-around bg-[--primary-bg]"
    >
      <div className="nav-content flex h-11.25 w-[90vw] items-center justify-around">
        {/* <div className="burger-btn flex h-8 w-8 cursor-pointer flex-col items-center justify-around">
          <div
            className="burger-btn-line br-[25px] h-1 w-full rounded-sm bg-white"
            id="burger-btn-line1"
          ></div>
          <div
            className="burger-btn-line br-[25px] h-1 w-full rounded-sm bg-white"
            id="burger-btn-line2 "
          ></div>
          <div
            className="burger-btn-line br-[25px] h-1 w-full rounded-sm bg-white"
            id="burger-btn-line3"
          ></div>
        </div> */}
        <div className="logo-banner flex w-[90%] items-center justify-center gap-4 justify-self-center text-white">
          <img src={logoInWhite} height={32} width="32" alt="" />
          <h1 className="logo h-10 text-center text-2xl uppercase">
            Pool Master
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
