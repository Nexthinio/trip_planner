import { Link } from "react-router-dom";
import "../styles/HeaderLP.css";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

export function Logout() {
  localStorage.clear();
  window.location.href = "/";
}

export function LogoutManual() {
  localStorage.clear();
  window.location.href = "/";
}

function NavigationLP() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="header">
        <Link className="logo-link" to="/">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Telefony */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Komputer */}
        <div className="navigation-bar desktop-only">
          {!loggedIn ? (
            <>
              <Link to="/">
                <div className="navigation-item">About</div>
              </Link>
              <Link to="/">
                <div className="navigation-item">Contact</div>
              </Link>
              <Link to="/login">
                <div className="navigation-item">Login | Register</div>
              </Link>
            </>
          ) : (
            <>
              <div className="userName-div">
                Hello,{" "}
                <span className="userName">{localStorage.getItem("name")}</span>
              </div>
              <button onClick={LogoutManual} className="navigation-item logout">
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Telefony menu wysuwane */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        {!loggedIn ? (
          <>
            <Link to="/" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/" onClick={toggleMenu}>
              Contact
            </Link>
            <Link to="/login" onClick={toggleMenu}>
              Login | Register
            </Link>
          </>
        ) : (
          <>
            <div className="userName-div-mobile">
              Hello,{" "}
              <span className="userName">{localStorage.getItem("name")}</span>
            </div>
            <button onClick={LogoutManual}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}

export default NavigationLP;
