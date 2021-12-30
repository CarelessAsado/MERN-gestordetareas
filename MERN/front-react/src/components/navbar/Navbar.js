import React, { useState, useEffect } from "react";
import { MenuList } from "./MenuLinks";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);
  function logout() {
    if (isLogged) {
      localStorage.removeItem("token");
      setShowMenu(!showMenu);
      window.location.replace("/login");
    }
  }
  return (
    <nav>
      <div className="nav-center">
        <div id="logo">
          ROD <font>LOP</font>
        </div>
        <div
          className={"containerYborderBurger " + (showMenu ? "" : "close")}
          onClick={function () {
            setShowMenu(!showMenu);
          }}
        >
          <div className="burgerMenu"></div>
        </div>
      </div>
      {/* add the active class to show or not the nav links */}
      <ul className={showMenu ? "" : "active"}>
        {isLogged &&
          MenuList.hayUser.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={`${item.url}`}
                  onClick={item.title === "Cerrar sesión" ? logout : ""}
                >
                  {" "}
                  {item.title}
                </Link>
              </li>
            );
          })}
        {isLogged ||
          MenuList.noHayUser.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`${item.url}`}> {item.title}</Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navbar;
