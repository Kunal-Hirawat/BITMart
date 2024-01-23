import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../../BuySell.css";
import "../../components/styles/CartStyles.css";
import { useAuth } from "../../context/auth";

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [lostfound, setLostFound] = useState([]);
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

  //get all products
  const getAllProducts = async () => {
    try {
      const email = auth.user.email;
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-user-product/${email}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const getLostfoundProducts = async () => {
    try {
      const email = auth.user.email;
      const { data } = await axios.get(
        `http://localhost:5000/api/lostfound/get-user-product/${email}`
      );
      setLostFound(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    getLostfoundProducts();
  }, []);
  return (
    <Layout>
      <div className="menu-layout">
        <div className="menu">
          <h1>Dashboard</h1>
          <div className="menu-tabs">
            <a href="/dashboard/user/profile">Update Profile</a>
            <a href="/dashboard/user/create-product">Create Product</a>
            <a href="/dashboard/user/user-products">Products</a>
            <a href="/cart">My Favourites</a>
            <Link onClick={handleLogout} to="../" className="nav_link">
              LogOut
            </Link>
          </div>
        </div>

        <div className="form ">
          <form className="form-container-2">
            <h1>All Products List</h1>
            <div style={{ display: products.length ? "block" : "none" }}>
              <h2>Buy/Sell Products:</h2>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/user/user-products/${p._id}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ display: lostfound.length ? "block" : "none" }}>
              <h2>Lost/Found Items:</h2>
              <div className="d-flex flex-wrap">
                {lostfound?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/user/lostfound-products/${p._id}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:5000/api/lostfound/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserProduct;
