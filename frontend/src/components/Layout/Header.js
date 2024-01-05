import React, { useState } from "react";
import {NavLink, Link} from "react-router-dom" ;
import "../../Header.css";
import { MdShoppingCart } from "react-icons/md";
import { HiShoppingBag } from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "../../context/auth";

function Header() {
  const [active, setActive] = useState("nav_menu");
  const [icon, setIcon] = useState("nav_toggler");
  const [auth , setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
  }
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
      <Link to="../" className="nav_name">
      <MdShoppingCart id="cart-logo" />BITMart
      </Link>
      <ul className={active}>
        <li className="nav_item">
          <NavLink to="../" className="nav_link">
            Home
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/" className="nav_link">
            Buy/Sell
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/" className="nav_link">
            Lost/Found
          </NavLink>
        </li>
        {
          !auth.user ? (<>
          <li className="nav_item">
          <NavLink to="../login" className="nav_link">
            SignIn
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="../register" className="nav_link">
            SignUp
          </NavLink>
        </li>
          </>) : (<>
        <li className="nav_item">
          <NavLink to="../" className="nav_link">
            <FaUser size={18}></FaUser>
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="../cart" className="nav_link">
            <HiShoppingBag size={20}/>
          </NavLink>
        </li>
          </>)
        }
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