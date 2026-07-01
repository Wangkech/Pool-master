// import "react"

function Header() {
  return (
    <nav className="top-nav bg-gray-800 w-full h-16 flex items-center justify-between px-4">
      <div className="nav-content">
        <div className="burger-btn">
          <div className="burger-btn-line" id="burger-btn-line1"></div>
          <div className="burger-btn-line" id="burger-btn-line2"></div>
          <div className="burger-btn-line" id="burger-btn-line3"></div>
        </div>
        <div className="logo-banner">
          <h1 className="logo">Pool Master</h1>
        </div>
      </div>
    </nav>
  );
}

export default Header;
