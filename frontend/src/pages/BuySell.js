import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { Radio } from "antd";
import { useAuth } from "../context/auth";
import "../BuySell.css";
import { Prices } from "../components/Prices";
import toast from "react-hot-toast";

const BuySell = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [radio, setRadio] = useState([]);
  const [sortby, setSortby] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product`
      );

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/product/product-filter",
        { radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while filtering products");
    }
  };

  const onChange = async (e) => {
    const { value } = e.target;
    console.log("radio checked", value);
    setSelectedValue(value);
  };

  const deselectOnClick = async (e) => {
    const { value } = e.target;
    if (value == selectedValue) {
      console.log("double clicked button", value);
      setSelectedValue(null);
      setRadio([]);
    }
  };

  useEffect(() => {
    switch (sortby) {
      case "1":
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case "-1":
        setProducts([...products].sort((a, b) => b.price - a.price));
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
        if (radio.length) handleFilter();
        else getAllProducts();
    }
  }, [sortby, radio]);

  useEffect(() => {
    if (radio.length) handleFilter();
    else getAllProducts();
  }, [radio]);

  return (
    <Layout title={"All Products"}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div>
            <h4>Filter By Price</h4>
            <div>
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                  onChange(e);
                }}
                value={selectedValue}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array} onClick={deselectOnClick}>
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="form-input">
            <label for="sortSelect">Sort By:</label>
            <select id="sortSelect" onChange={(e) => setSortby(e.target.value)}>
              <option value="0" selected>
                Featured
              </option>
              <option value="1">Price: Low to High</option>
              <option value="-1">Price: High to Low</option>
              <option value="2">Alphabetical: A-Z</option>
              <option value="-2">Alphabetical: Z-A</option>
            </select>
          </div>
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

export default BuySell;
