import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../components/styles/CartStyles.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDateTime] = useState("");
  const [isLostFound, setIsLostFound] = useState("false");
  const [photo, setPhoto] = useState("");

  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    toast.success("LogOut Successful");
    window.location.reload();
  };

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("photo", photo);
      productData.append("email", auth.user.email);
      productData.append("contact", auth.user.contact);
      if (isLostFound === "true") {
        productData.append("location", location);
        productData.append("datetime", datetime);
      } else {
        productData.append("price", price);
        productData.append("quantity", quantity);
      }
      const { data } = axios.post(
        isLostFound === "true"
          ? "http://localhost:5000/api/lostfound/create-product"
          : "http://localhost:5000/api/product/create-product",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
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
          <h1>Admin Panel</h1>
          <div className="menu-tabs">
            <a href="/dashboard/admin/profile">Update Profile</a>
            <a href="/dashboard/admin/create-product">Create Product</a>
            <a href="/dashboard/admin/products">Products</a>
            <a href="/dashboard/admin/users">Users</a>
            <Link onClick={handleLogout} to="/" className="nav_link">
              LogOut
            </Link>
          </div>
        </div>

        <div className="form ">
          <form className="form-container-2">
            <h1>Create Product</h1>
            <div className="d-flex flex-wrap">
              <div className="m-1 w-75">
                <div className="mb-3">
                  <h3>Select Product Type:</h3>
                  <select
                    onChange={(event) => setIsLostFound(event.target.value)}
                  >
                    <option value="false" selected>
                      Buy/Sell
                    </option>
                    <option value="true">Lost/Found</option>
                  </select>
                </div>
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

                <div
                  className="mb-3"
                  style={{ display: isLostFound === "true" ? "none" : "block" }}
                >
                  <input
                    type="number"
                    min="1"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: isLostFound === "true" ? "none" : "block" }}
                >
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div
                  className="mb-3"
                  style={{
                    display: isLostFound === "false" ? "none" : "block",
                  }}
                >
                  <input
                    type="text"
                    value={location}
                    placeholder="enter location of item"
                    className="form-control"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: isLostFound === "false" ? "none" : "block",
                  }}
                >
                  <input
                    type="datetime-local"
                    value={datetime}
                    placeholder="enter date and time"
                    className="form-control"
                    onChange={(e) => setDateTime(e.target.value)}
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

export default CreateProduct;
