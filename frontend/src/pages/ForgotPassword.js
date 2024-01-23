import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import { TbLockQuestion } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "../ForgotPassword.css";
import { FaLock, FaQuestion } from "react-icons/fa6";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [flag, setFlag] = useState(0);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleEmailInput = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:5000/api/auth/getSecurityQuestion";
      const res = await axios.get(`${url}?email=${email}`);

      if (res.data.success) {
        setSecurityQuestion(res.data.securityQuestion);
        setFlag(1);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  const handleAnswerInput = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/checkSecurityAnswer";
      const res = await axios.post(`${url}`, {
        email,
        securityAnswer,
      });
      if (res.data.success) {
        setFlag(2);
        toast.success(res.data.message);
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  const handlePasswordInput = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/forgotPassword";
      const res = await axios.post(`${url}`, {
        email,
        securityAnswer,
        newPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("../login");
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  return (
    <Layout title="forgotPassword">
      <div className="forgotPassword-page">
        <TbLockQuestion size={"115"} id="forgotPassword-image"></TbLockQuestion>
        <div className="forgotPassword">
          <h1>Forgot Password</h1>
          <div style={{ display: flag === 0 ? "block" : "none" }}>
            <form method="post" onSubmit={handleEmailInput}>
              <div className="form-input">
                <i>
                  <MdEmail />
                </i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                ></input>
              </div>
              <div className="button">
                <input
                  type="submit"
                  value={"Submit"}
                  className="submit-button"
                ></input>
              </div>
            </form>
          </div>

          <div style={{ display: flag === 1 ? "block" : "none" }}>
            <h3>{securityQuestion}</h3>
            <form method="post" onSubmit={handleAnswerInput}>
              <div className="form-input">
                <i>
                  <FaQuestion />
                </i>
                <input
                  type="text"
                  placeholder="Enter answer to the security question"
                  onChange={(event) => setSecurityAnswer(event.target.value)}
                  required
                ></input>
              </div>
              <div className="button">
                <input
                  type="submit"
                  value={"Submit"}
                  className="submit-button"
                ></input>
              </div>
            </form>
          </div>

          <div style={{ display: flag === 2 ? "block" : "none" }}>
            <form method="post" onSubmit={handlePasswordInput}>
              <div className="form-input">
                <i>
                  <FaLock />
                </i>
                <input
                  type={type}
                  placeholder="Enter New Password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                ></input>
                <Icon
                  icon={icon}
                  id="forgotPassword-password-image"
                  onClick={handleToggle}
                  style={{
                    display: "inline",
                    marginLeft: "-7%",
                    verticalAlign: "middle",
                    cursor: "pointer",
                  }}
                ></Icon>
              </div>
              <div className="button">
                <input
                  type="submit"
                  value={"Submit"}
                  className="submit-button"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
