import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../components/styles/CartStyles.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const CreateProductUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

  const [auth, setAuth] = useAuth();

  const handleLogout = () =>{
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("LogOut Successful");
    window.location.reload()
  }

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("email", (auth.user.email));
      productData.append("contact", (auth.user.contact));
      const { data } = axios.post(
        "http://localhost:5000/api/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
 
  return (
    <Layout title={"Dashboard - Create Product"}>
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
            <a href="/dashboard/user/user-products">
              Products
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
          <form  className="form-container-2">
            <h1>Create Product</h1>
            <div className="d-flex flex-wrap">
            <div className="m-1 w-75">
            <div className="mb-3">
              <label className="submit-button1 ">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="submit-button1" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
               
          </div>
            </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProductUser;