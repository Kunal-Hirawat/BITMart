import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../components/styles/CartStyles.css";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  
  return (
    <Layout title={"Dashboard- BITMart"}>
    <div className="dashboard-body">
      <div className="menu-layout">
        <UserMenu />
        <div className="form ">
          <form className="form-container-2">
            <h1> User Details </h1>
            <h3>Name : {auth?.user?.name}</h3>
            <h3>Contact : {auth?.user?.contact}</h3>
            <h3>Email : {auth?.user?.email}</h3>
            <h3 style={{ display: auth?.user?.address ? "block" : "none" }}>
              Address : {auth?.user?.address}
            </h3>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
