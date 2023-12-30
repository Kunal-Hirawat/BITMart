import React, { useState } from "react";
import "../../Header.css";
import { MdShoppingCart } from "react-icons/md";

function Header() {
  const [active, setActive] = useState("nav_menu");
  const [icon, setIcon] = useState("nav_toggler");
  const navToggle = () => {
    if (active === "nav_menu") {
      setActive("nav_menu nav_active");
    } else setActive("nav_menu");

    // Icon Toggler
    if (icon === "nav_toggler") {
      setIcon("nav_toggler toggle");
    } else setIcon("nav_toggler");
  };
  return (
    <nav className="nav">
      <a href="../" className="nav_name">
      <MdShoppingCart id="cart-logo" />BITMart
      </a>
      <ul className={active}>
        <li className="nav_item">
          <a href="../" className="nav_link">
            Home
          </a>
        </li>
        <li className="nav_item">
          <a href="/" className="nav_link">
            Buy/Sell
          </a>
        </li>
        <li className="nav_item">
          <a href="/" className="nav_link">
            Lost/Found
          </a>
        </li>
        <li className="nav_item">
          <a href="../login" className="nav_link">
            SignIn
          </a>
        </li>
        <li className="nav_item">
          <a href="../register" className="nav_link">
            SignUp
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Header;