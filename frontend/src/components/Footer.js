import React from 'react'
import {Link} from "react-router-dom"
import { FiFacebook ,FiInstagram,FiLinkedin,FiTwitter} from "react-icons/fi";
import "../../src/Footer.css"

const Footer = () => {
  return (
    <div className='footer'>
        <p className='icons-div'>
        <a href="https://www.facebook.com"><FiFacebook/></a>

        <a href="https://www.instagram.com"><FiInstagram/></a>

        <a href="https://in.linkedin.com"><FiLinkedin/></a>

        <a href="https://twitter.com"><FiTwitter/></a>
        </p>
        <p>
          <Link to="./">Home</Link> 

          <Link to="">Buy/Sell</Link>

          <Link to="">Lost/Found</Link>

          <Link to="">Register</Link>
        </p>
        <p>
          <Link to="/info">Info</Link>

          <Link to="/support">Support</Link>

          <Link to="/termsOfUse">Terms Of Use</Link>
        </p>

        <h6>
        © 2023 BITMart Ltd
        </h6>
    </div>
  )
}

export default Footer