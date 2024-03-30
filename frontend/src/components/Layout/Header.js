import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../Header.css";
import { MdShoppingCart } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import SearchInput from "../Forms/searchInput";

function Header() {
  const [active, setActive] = useState("nav_menu");
  const [icon, setIcon] = useState("nav_toggler");
  const [auth] = useAuth();
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
    <div className="padding-div">
    <nav className="nav">
      <Link to="/" className="nav_name">
        <MdShoppingCart id="cart-logo" />
        BITMart
      </Link>
      <SearchInput></SearchInput>
      <ul className={active}>
        <li className="nav_item">
          <NavLink to="/" className="nav_link">
            HOME
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/buy-sell" className="nav_link">
            BUY/SELL
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/lost-found" className="nav_link">
            LOST/FOUND
          </NavLink>
        </li>
        {!auth.user ? (
          <>
            <li className="nav_item">
              <NavLink to="/login" className="nav_link">
                 SIGNIN
              </NavLink>
            </li>
            <li className="nav_item">
              <NavLink to="/register" className="nav_link">
                SIGNUP
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav_item">
              <NavLink
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                <FaUser size={18}></FaUser>
              </NavLink>
            </li>
            <li className="nav_item">
              <NavLink to="/cart" className="nav_link">
                <HiShoppingBag size={20} />
              </NavLink>
            </li>
          </>
        )}
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
    </div>
  );
}

export default Header;
