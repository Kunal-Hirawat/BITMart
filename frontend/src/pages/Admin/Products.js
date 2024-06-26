import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../../BuySell.css";
import "../../components/styles/CartStyles.css";
import AdminMenu from "../../components/Layout/AdminMenu";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BASE_URL } from "../../url.js";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [lostfound, setLostFound] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const getLostfoundProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/lostfound/get-product`
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
    getLostfoundProducts();
  }, []);
  return (
    <Layout>
    <div className="dashboard-body">
      <div className="menu-layout">
        <AdminMenu />

        <div className="form-2 ">
          <form className="form-container-3">
            <h1>All Products List</h1>
            <div style={{ display: products.length ? "block" : "none" }}>
              <h2>Buy/Sell Products:</h2>
              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p._id}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <LazyLoadImage
                        src={`${BASE_URL}/api/product/product-photo/${p._id}`}
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
                    to={`/dashboard/admin/lostfound-product/${p._id}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <LazyLoadImage
                        src={`${BASE_URL}/api/lostfound/product-photo/${p._id}`}
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
      </div>
    </Layout>
  );
};

export default Products;
