import React from "react";
import Layout from "../components/Layout/Layout";
import supportImage from "../assets/images/5138237.jpg";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <img src={supportImage} style={{
          height:"60vh",
          width:"30vw"
        }}></img>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          Contact us anytime for any query,feedback or product related issue. Our support is available 24x7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : help@bitmart.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;