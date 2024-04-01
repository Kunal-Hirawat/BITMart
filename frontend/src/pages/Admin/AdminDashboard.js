import React from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "../../components/styles/CartStyles.css";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="dashboard-body">
      <div className="menu-layout">
        <AdminMenu />
        <div className="form">
          <form className="form-container-2">
            <h1> Admin Details </h1>
            <h3> Admin Name : {auth?.user?.name}</h3>
            <h3> Admin Email : {auth?.user?.email}</h3>
            <h3> Admin Contact : {auth?.user?.contact}</h3>
            <h3 style={{ display: auth?.user?.address ? "block" : "none" }}>
              Admin Address : {auth?.user?.address}
            </h3>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
