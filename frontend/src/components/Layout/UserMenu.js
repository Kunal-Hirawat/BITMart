import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../UserMenu.css";
import "../styles/CartStyles.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("LogOut Successful");
    window.location.reload();
  };
  return (
    <div className="padding-div-admin-menu">
      <div className="menu">
          <h1>Dashboard</h1>
          <div className="menu-tabs">
            <a href="/dashboard/user/profile">Update Profile</a>
            <a href="/dashboard/user/create-product">Create Product</a>
            <a href="/dashboard/user/user-products">Products</a>
            <a href="/cart">My Favourites</a>
            <Link onClick={handleLogout} to="../" className="nav_link">
              LogOut
            </Link>
          </div>
        </div>
        </div>
  );
};

export default UserMenu;
