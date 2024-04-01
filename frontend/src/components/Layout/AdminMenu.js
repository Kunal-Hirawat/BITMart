import React from "react";
import "../../UserMenu.css";
import { NavLink , Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const AdminMenu = () => {
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
    <>
    <div className="padding-div-admin-menu">
      <div className="menu">
          <h1>Admin Panel</h1>
          <div className="menu-tabs">
            <NavLink to="/dashboard/admin/profile" className="nav_link">Update Profile</NavLink>
            <NavLink to="/dashboard/admin/create-product" className="nav_link">Create Product</NavLink>
            <NavLink to="/dashboard/admin/products" className="nav_link">Products</NavLink>
            <NavLink to="/dashboard/admin/users" className="nav_link">Users</NavLink>
            <Link onClick={handleLogout} to="/" className="nav_link">
              LogOut
            </Link>
          </div>
        </div>
        </div>
    </>
  );
};

export default AdminMenu;
