import Layout from "../components/Layout/Layout";
import React from "react";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "../BuySell.css";

const formatDate = (date) => {
  const datetime = new Date(date);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDate = formatter.format(datetime); 
  const [datePart, timePart] = formattedDate.split(", ");
  const [month, day, year] = datePart.split("/");
  const [time, ampm] = timePart.split(" ");
  const output = `${day}-${month}-${year} ${time}${ampm}`;
  return output;
};

const Search = () => {
  const [products] = useSearch();
  const navigate = useNavigate();
  const [auth] = useAuth();

  window.addEventListener("beforeunload",(e) => {
    window.confirm("pakka");
  });

  return (
    <Layout title={"All Products"}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-9 ">
          <h1 className="text-center">Search Results</h1>
          <h3 className="text-center">
            {products?.BuySellResults.length +
              products?.LostFoundResults.length <
            1
              ? `No products found for "${products.keyword}" in "${products.type}"`
              : `Found ${
                  products?.BuySellResults.length +
                  products?.LostFoundResults.length
                } products for "${products.keyword}" in "${products.type}"`}
          </h3>
          <div
            style={{
              display: products?.BuySellResults.length ? "block" : "none",
            }}
          >
            <h3>Buy/Sell Products:</h3>
            <div className="d-flex flex-wrap">
              {products?.BuySellResults.map((p) => (
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

          <div
            style={{
              display: products?.LostFoundResults.length ? "block" : "none",
            }}
          >
            <h3>Lost/Found Products:</h3>
            <div className="d-flex flex-wrap">
              {products?.LostFoundResults.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`http://localhost:5000/api/lostfound/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {formatDate(p.datetime)}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}
                    </p>
                    <p className="card-text ">
                      <b>Location:</b> {p.location.substring(0, 60)}
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
                          onClick={() => navigate(`/lostfound/${p._id}`)}
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
      </div>
    </Layout>
  );
};

export default Search;
