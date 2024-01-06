import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import "../BuySell.css";

const BuySell = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [auth , setAuth] = useAuth();

  const getAllProducts = async () => {
    try {
     
      const { data } = await axios.get(`http://localhost:5000/api/product/get-product`);
     
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
     getAllProducts();
  });


  return (
    <Layout title={"All Products"}>
 
      <div className="container-fluid row mt-3 home-page">
   
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                  {
                        !auth.user ? ( 
                            <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/login`)}
                            >
                            More Details
                            </button>
                        ) : (
                             <button
                             className="btn btn-info ms-1"
                             onClick={() => navigate(`/product/${p._id}`)}
                           >
                             More Details
                           </button>
                        )
                    }
                   

                  </div>
                </div>
              </div>
            ))}
          </div>
    
        </div>
      </div>
    </Layout>
  );
};

export default BuySell;