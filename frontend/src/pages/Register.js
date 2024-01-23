import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser, FaQuestion } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import "../Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/register";
      const res = await axios.post(`${url}`, {
        name,
        email,
        contact,
        password,
        address,
        securityQuestion,
        securityAnswer,
      });
      if (res.data.success) {
        toast.success(res.data.message + " Please Sign In To Continue.");
        navigate("../login");
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  return (
    <Layout title="Register">
      <div className="register-page">
        <FaUser size={"115"} id="register-image"></FaUser>
        <div className="register">
          <div></div>
          <h1>Welcome</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-input">
              <i>
                <FaUser />
              </i>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(event) => setName(event.target.value)}
                required
              ></input>
            </div>
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
            <div className="form-input">
              <i>
                <FaPhone />
              </i>
              <input
                type="text"
                placeholder="Enter your contact"
                onChange={(event) => setContact(event.target.value)}
                required
              ></input>
            </div>
            <div className="form-input">
              <i>
                <TiHome />
              </i>
              <input
                type="text"
                placeholder="Enter your address"
                onChange={(event) => setAddress(event.target.value)}
              ></input>
            </div>
            <div className="form-input">
              <i>
                <FaQuestion />
              </i>
              <select
                onChange={(event) => setSecurityQuestion(event.target.value)}
              >
                <option value="" disabled selected hidden>
                  Please Choose A Security Question
                </option>
                <option value="What is your all-time favorite book or movie?">
                  What is your all-time favorite book or movie?
                </option>
                <option value="What was your favorite childhood toy?">
                  What was your favorite childhood toy?
                </option>
                <option value="Where did you go on your favorite vacation?">
                  Where did you go on your favorite vacation?
                </option>
                <option value="Who is your greatest role model?">
                  Who is your greatest role model?
                </option>
                <option value="Who is your favorite historical figure?">
                  Who is your favorite historical figure?
                </option>
              </select>
            </div>
            <div className="form-input">
              <i>
                <FaUser />
              </i>
              <input
                type="text"
                placeholder="Enter Answer to Security Question"
                onChange={(event) => setSecurityAnswer(event.target.value)}
                required
              ></input>
            </div>
            <div className="form-input" style={{ marginLeft: "30px" }}>
              <i>
                <FaLock />
              </i>
              <input
                type={type}
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
                required
                id="register-password"
              ></input>
              <Icon
                icon={icon}
                id="register-password-image"
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
                value={"Sign Up"}
                className="submit-button"
              ></input>
            </div>
          </form>
          <p>
            Already have an account? <a href="../login">Sign in</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
