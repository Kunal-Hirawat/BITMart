import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import "../BuySell.css";
import toast from "react-hot-toast";

const LostFound = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [auth] = useAuth();
  const [sortby, setSortby] = useState("");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lostfound/get-product`
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/lostfound/product-filter",
        { startDate, endDate }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while filtering products");
    }
  };

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

  useEffect(() => {
    switch (sortby) {
      case "1":
        setProducts(
          [...products].sort(
            (a, b) => new Date(a.datetime) - new Date(b.datetime)
          )
        );
        break;
      case "-1":
        setProducts(
          [...products].sort(
            (a, b) => new Date(b.datetime) - new Date(a.datetime)
          )
        );
        break;

      case "-2":
        setProducts(
          [...products].sort((a, b) =>
            b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
          )
        );
        break;
      case "2":
        setProducts(
          [...products].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
          )
        );
        break;
      case "0":
        if (startDate.length && endDate.length) handleFilter();
        else getAllProducts();
    }
  }, [sortby, startDate, endDate]);

  useEffect(() => {
    if (startDate.length && endDate.length) handleFilter();
    else getAllProducts();
  }, [startDate, endDate]);

  return (
    <Layout title={"All Products"}>
      <div className="buy-sell-body">
        <h1 className="text-center">All Items</h1>
        <div className="form-input">
          <div className="form-label">
            <label for="sortSelect">Sort By:</label>
            <select id="sortSelect" onChange={(e) => setSortby(e.target.value)}>
              <option value="0" selected>
                Featured
              </option>
              <option value="1">Time: Earlier first</option>
              <option value="-1">Time: Latest First</option>
              <option value="2">Alphabetical: A-Z</option>
              <option value="-2">Alphabetical: Z-A</option>
            </select>
          </div>
        </div>
        <div className="filter-search">
          <div>
            <h4>Filter By Date</h4>
            <div>
              <span>From</span>
              <input
                type="datetime-local"
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
              <span>To</span>
              <input
                type="datetime-local"
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="container-fluid row mt-3 home-page">
          <div className="col-md-9 ">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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

export default LostFound;
