import React from "react";
import Layout from "../components/Layout/Layout";
import testImage from "../assets/images/5138237.jpg";
import "../pages/info.css";

const About = () => {
  return (
    <Layout title={"About us - BIT Mart"}>
      <div className="outer-container">
        <div>
          <h1>Our Team</h1>
        </div>
        <div>
          <div className="team-container">
            <div className="profile-container">
              <div>
                <img src={testImage} alt="Kunal Hirawat"></img>
              </div>
              <div>
                <h3>Kunal Hirawat</h3>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
            <div className="profile-container">
              <div>
                <img src={testImage} alt="Lakshay Bindlish"></img>
              </div>
              <div>
                <h3>Lakshay Bindlish</h3>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
            <div className="profile-container">
              <div>
                <img src={testImage} alt="Akshay Varma"></img>
              </div>
              <div>
                <h3>Akshay Varma</h3>
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
