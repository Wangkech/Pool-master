// import "react"

function Header() {
  return (
    <nav className="top-nav fixed top-0 w-full h-[75px] bg-[#1A1A1A] items-center justify-around flex ">
      <div className="nav-content w-[90vw] h-[45px] flex justify-around items-center">
        <div className="burger-btn w-[2rem] h-[2rem] cursor-pointer flex flex-col justify-around items-center">
          <div
            className="burger-btn-line w-full h-[0.25rem] br-[25px] rounded-sm bg-white"
            id="burger-btn-line1"
          ></div>
          <div
            className="burger-btn-line w-full h-[0.25rem] br-[25px] rounded-sm bg-white"
            id="burger-btn-line2 "
          ></div>
          <div
            className="burger-btn-line w-full h-[0.25rem] br-[25px] rounded-sm bg-white"
            id="burger-btn-line3"
          ></div>
        </div>
        <div className="logo-banner  w-[90%]   text-center ">
          <h1 className="logo mt-auto mb-auto text-2xl text-center  uppercase">
            Pool Master
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default Header;
