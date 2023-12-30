import React,{useState} from 'react';
import axios from 'axios';
import Layout from "../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import "../login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/login";
      const res = await axios.post(`${url}`, { email, contact, password });
      if (res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('../');
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  return (
    <Layout title="login">
      <div className="login-page">
        <FaUser size={"115"} id="login-image"></FaUser>
        <div className="login">
          <div></div>
          <h1>Welcome Back</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-input">
              <i>
                <MdEmail />
              </i>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(event)=>setEmail(event.target.value)}
                required
              ></input>
            </div>
            <div className="form-input">
              <i>
                <FaPhone />
              </i>
              <input
                type="text"
                placeholder="Enter your contact"
                onChange={(event)=>setContact(event.target.value)}
                required
              ></input>
            </div>
            <div className="form-input">
              <i>
                <FaLock />
              </i>
              <input
                type="password"
                placeholder="Enter password"
                onChange={(event)=>setPassword(event.target.value)}
                required
              ></input>
            </div>
            <div className="button">
              <input
                type='submit'
                value={"Sign In"}
                className="submit-button"
              ></input>
            </div>
          </form>
          <p>
            Don't have an account yet? <a href="../register">Sign up</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
