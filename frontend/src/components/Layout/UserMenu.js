import React from "react";
import { NavLink , Link} from "react-router-dom";
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
            <NavLink to="/dashboard/user/profile" className="nav_link">Update Profile</NavLink>
            <NavLink to="/dashboard/user/create-product" className="nav_link">Create Product</NavLink>
            <NavLink to="/dashboard/user/user-products" className="nav_link">Products</NavLink>
            <NavLink to="/cart" className="nav_link">My Favourites</NavLink>
            <Link onClick={handleLogout} to="/" className="nav_link">
              LogOut
            </Link>
          </div>
        </div>
        </div>
  );
};

export default UserMenu;
