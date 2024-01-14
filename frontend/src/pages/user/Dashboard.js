import React from "react";
import {Link} from "react-router-dom"
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../components/styles/CartStyles.css";
import toast from "react-hot-toast"

const Dashboard = () => {
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
    <Layout title={"Dashboard- BITMart"}>
          <div className="menu-layout">
        <div className="menu">
          <h1>
            Dashboard
          </h1>
          <div className="menu-tabs">
            <a href="/dashboard/user/profile">
              Update Profile
            </a>
            <a href="/dashboard/user/create-product">
              Create Product
            </a>
            <a href="/dashboard/user/user-products">
              Products
            </a>
            <a href="/cart">
              My Favourites
            </a>
            <Link onClick={handleLogout} to="../" className="nav_link">
          LogOut
        </Link>
          </div>
        </div>
        <div className="form ">
          <form className="form-container-2">
            <h1> User Details </h1>
              <h3>Name : {auth?.user?.name}</h3>
              <h3>Contact : {auth?.user?.contact}</h3>
              <h3>Email : {auth?.user?.email}</h3>
              <h3>Address : {auth?.user?.address}</h3>
          </form>
        </div>
        </div>
      
    </Layout>
  );
};

export default Dashboard;