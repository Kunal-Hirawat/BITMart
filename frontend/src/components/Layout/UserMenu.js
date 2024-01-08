import React from "react";
import { NavLink } from "react-router-dom";
import "../../UserMenu.css";
import "../styles/CartStyles.css"
const UserMenu = () => {
  return (
    <div>
      {/* <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div> */}
      <div className="menu-layout">
        <div className="menu">
          <h1>
            Dashboard
          </h1>
          <div className="menu-tabs">
            <a href="/dashboard/user/profile">
              Profile
            </a>
            <a href="/dashboard/user/orders">
              Orders
            </a>
          </div>
        </div>

    </div>
    </div>
  );
};

export default UserMenu;