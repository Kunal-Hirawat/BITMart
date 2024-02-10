import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { Radio } from "antd";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { RiHeart3Fill } from "react-icons/ri";
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
  const [wishlist, setWishlist] = useState({});
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [cart, setCart] = useCart();

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

  const handleRange = async () => {
    if (!min) {
      toast.error("Please enter minimum value");
      return;
    } else if (!max) {
      toast.error("Please enter max value");
      return;
    } else if (min > max) {
      toast.error("Maximum value cannot be less than minimum value");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/product/product-filter",
        { radio: [min, max] }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while filtering products");
    }
  };

  const handleClear = async () => {
    setMin(null);
    setMax(null);
    setRadio([]);
    setSelectedValue(null);
    document.getElementById("min-input").value = null;
    document.getElementById("max-input").value = null;
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
    setMin(null);
    setMax(null);
    setSelectedValue(value);
  };

  const deselectOnClick = async (e) => {
    const { value } = e.target;
    console.log(value);
    console.log(selectedValue);
    if (value == selectedValue) {
      console.log("double clicked button", value);
      setSelectedValue(null);
      setRadio([]);
    }
  };

  const handleClick = (product) => {
    if (!auth.user) {
      toast.error("please login to continue");
      navigate("/login");
    } else {
      const items = JSON.parse(localStorage.getItem("cart")) || [];
      let exists = false;

      if (items.length) {
        for (const item of items) {
          if (item?._id === product._id) {
            exists = true;
            break;
          }
        }
      }
      if (exists) {
        const updatedCart = cart.filter((item) => item._id !== product._id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast("Product removed from favourites", { icon: "🥺" });
      } else {
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
        toast("Product added to favourites", { icon: "❤️" });
      }
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

  useEffect(() => {
    const initialWishlistState = {};
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    if (items.length) {
      for (const item of items) {
        initialWishlistState[item._id] = true;
      }
    }
    setWishlist(initialWishlistState);
  }, [cart]);

  return (
    <Layout title={"All Products"}>
      <div className="buy-sell-body">
        <h1 className="text-center">All Products</h1>
        <div className="form-input">
          <div className="form-label">
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
        </div>
        <div className="filter-search">
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
              <div className="filter-input-container">
                <input
                  type="number"
                  placeholder="Min"
                  min={0}
                  max={999999999}
                  onChange={(e) => setMin(e.target.value)}
                  value={min}
                  id="min-input"
                  className="filter-input-box"
                ></input>
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  max={999999999}
                  min={0}
                  onChange={(e) => setMax(e.target.value)}
                  value={max}
                  id="max-input"
                  className="filter-input-box"
                ></input>
              </div>
              <div>
                <button onClick={handleRange} className="pnf-btn go-button">
                  Go
                </button>
                <button onClick={handleClear} className="pnf-btn clear-button">
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid row mt-3 home-page">
          <div className="col-md-9 ">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <div className="heart-container">
                    <RiHeart3Fill
                      className={wishlist[p._id] ? "heart-active" : "heart"}
                      onClick={() => handleClick(p)}
                    ></RiHeart3Fill>
                  </div>
                  <img
                    src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                    onClick={() =>
                      navigate(!auth.user ? `/login` : `/product/${p._id}`)
                    }
                    className="card-img-top"
                    alt={p.name}
                  />
<<<<<<< HEAD
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
                      {p.description.substring(0, 60)}
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
=======
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
                    {p.description.substring(0, 20)}...
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
>>>>>>> Kunal
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

export default BuySell;
