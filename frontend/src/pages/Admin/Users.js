import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import "../../components/styles/CartStyles.css";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  

  //get all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //delete a user
  const handleDelete = async (email) => {
    try {
      let answer = window.confirm("Are You Sure want to delete this user ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:5000/api/auth/delete-user/${email}`
      );
      if (!data?.success) {
        toast.error(data.message);
        return;
      }
      await axios.delete(
        `http://localhost:5000/api/product/deleted-user-product/${email}`
      );
      await axios.delete(
        `http://localhost:5000/api/lostfound/deleted-user-product/${email}`
      );
      toast.success("User Deleted Successfully");
      navigate("/dashboard/admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
    <div className="dashboard-body">
      <div className="menu-layout">
        <AdminMenu />
        <div className="form-2">
          <form className="form-container-3">
            <h1>All Users</h1>
            <div className="d-flex flex-wrap">
              {users?.map((u) => (
                <Link key={u._id} className="product-link">
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">{u.name}</h5>
                      <p className="card-text">{u.contact}</p>
                      <p className="card-text">{u.email}</p>
                      <div className="mb-3">
                        <button
                          className="danger-btn"
                          onClick={(e) => handleDelete(u.email)}
                        >
                          DELETE USER
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Users;
