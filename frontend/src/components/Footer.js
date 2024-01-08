import React from 'react'
import {Link} from "react-router-dom"
import { FiFacebook ,FiInstagram,FiLinkedin,FiTwitter} from "react-icons/fi";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast"
import "../../src/Footer.css"


const Footer = () => {
  const [auth , setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    toast.success("LogOut Successful");
    window.location.reload()
  }
  return (
    <div className='footer'>
        <p className='icons-div'>
        <a href="https://www.facebook.com"><FiFacebook/></a>

        <a href="https://www.instagram.com"><FiInstagram/></a>

        <a href="https://in.linkedin.com"><FiLinkedin/></a>

        <a href="https://twitter.com"><FiTwitter/></a>
        </p>
        <p>
          <Link to="/">Home</Link> 

          <Link to="">Buy/Sell</Link>

          <Link to="">Lost/Found</Link>
          {
          !auth.user ? (<> 
          
          <Link to="/register">Register</Link>
          </>) : (
          <Link onClick={handleLogout} to="/" className="nav_link">
          LogOut
        </Link>)
          
        }

        </p>
        <p>
          <Link to="/info">Info</Link>

          <Link to="/support">Support</Link>

          <Link to="./">Terms Of Use</Link>
        </p>

        <h6>
        © 2023 BITMart Ltd
        </h6>
    </div>
  )
}

export default Footer