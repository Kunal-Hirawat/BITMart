import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CartStyles.css"
import loading from "../assets/images/loading.gif"
const Spinner = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      {/* <div
        className="spin"
        style={{ height: "100vh" }}
      >
        <h1>Redirecting to the login page in {count} seconds </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
      <div
        className="spin"
        style={{ height: "100vh" }}
      >
        <h1>Redirecting to the login page in {count} seconds </h1>
        <div>
          <span><img src={loading} alt="loading"></img></span>
        </div>
      </div>
    </>
  );
};

export default Spinner;