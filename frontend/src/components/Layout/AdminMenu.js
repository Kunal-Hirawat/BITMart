import React from "react";
import { NavLink } from "react-router-dom";
import "../../UserMenu.css";
import { Link } from "react-router-dom";
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
            <a href="/dashboard/admin/profile">Update Profile</a>
            <a href="/dashboard/admin/create-product">Create Product</a>
            <a href="/dashboard/admin/products">Products</a>
            <a href="/dashboard/admin/users">Users</a>
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
