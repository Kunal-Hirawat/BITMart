import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import "../../components/styles/CartStyles.css";
import {Link} from "react-router-dom"

export default function Profile() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    toast.success("LogOut Successful");
    window.location.reload()
  }
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:5000/api/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
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
            <a href="/cart">
              My Favourites
            </a>
            <Link onClick={handleLogout} to="../" className="nav_link">
          LogOut
        </Link>
          </div>
        </div>

        <div className="form ">
          <form onSubmit={handleSubmit} className="form-container-2">
            <h1> User Profile </h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" disabled/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone" />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your Address" />

            <button type="submit" className="submit-button1">UPDATE</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
