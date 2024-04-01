import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CartStyles.css";
import loading from "../assets/images/loading2.gif";
const Spinner = () => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div className="dashboard-body">
      <div className="spin" style={{ height: "100vh" }}>
        <div>
          <span>
            <img src={loading} alt="loading"></img>
          </span>
        </div>
      </div>
      </div>
    </>
  );
};

export default Spinner;
