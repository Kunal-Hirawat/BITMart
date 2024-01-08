import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import "../../components/styles/CartStyles.css"
import { useAuth } from "../../context/auth";
import {Link} from "react-router-dom"
import toast from "react-hot-toast";


const Users = () => {
  const [auth,setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    toast.success("LogOut Successful");
    window.location.reload()
  }
  return (
    <Layout>
    <div className="menu-layout">
        <div className="menu">
          <h1>
            Admin Panel
          </h1>
          <div className="menu-tabs">
            <a href="/dashboard/admin/create-product">
              Create Product
            </a>
            <a href="/dashboard/admin/products">
              Products
            </a>
            <a href="/dashboard/admin/users">
              Users
            </a>
            <Link onClick={handleLogout} to="/" className="nav_link">
          LogOut
        </Link>
          </div>
        </div>
        <div className="form ">
          <form className="form-container-2">
            <h1>All Users</h1>
            </form>
          </div>
        </div>
      
    </Layout>
  );
};

export default Users;