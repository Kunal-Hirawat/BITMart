import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "../BuySell.css";

const Search = () => {
  const [products] = useSearch();
  const navigate = useNavigate();
  const [auth] = useAuth();
  return (
    <Layout title={"All Products"}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-9 ">
          <h1 className="text-center">Search Results</h1>
          <h3 className="text-center">
            {products?.results.length < 1
              ? "No products found"
              : `Found ${products?.results.length} products`}
          </h3>
          <div className="d-flex flex-wrap">
            {products?.results.map((p) => (
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
                    {!auth.user ? (
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
                    )}
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

export default Search;
