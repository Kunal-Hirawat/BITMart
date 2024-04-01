import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { RiHeart3Fill } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../Home.css";
import { FaArrowRight } from "react-icons/fa6";
import { BASE_URL } from "../url.js";

const Home = () => {
  const [auth] = useAuth();
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [lostFound, setLostFound] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/product/get-product`
      );
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const getLostFoundProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/lostfound/get-product`
      );
      // console.log(data.products);
      setLostFound(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
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

  // Fetch products from the backend
  useEffect(() => {
    getProducts();
    getLostFoundProducts();
  }, []);
  const latestProducts = products.slice(-4);
  const lostFoundProducts = lostFound.slice(-4);

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
    <Layout>
      <div>
        <div className="welcome"></div>
        <div className="products-container">
          <div className="products" id="products">
            <p className="prod_head">Checkout New Products</p>
            <div className="card_container">
              {latestProducts?.map((p) => (
                <div key={p._id}>
                  <div className="card" style={{ width: "28rem" }}>
                    <div className="heart-container">
                      <RiHeart3Fill
                        className={wishlist[p._id] ? "heart-active" : "heart"}
                        onClick={() => handleClick(p)}
                      ></RiHeart3Fill>
                    </div>
                    <LazyLoadImage
                      src={`${BASE_URL}/api/product/product-photo/${p._id}`}
                      className="card-img"
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
                        {p.description.substring(0, 60)}
                      </p>
                      <p className="card-text ">
                      <b>Quantity: </b>
                      {p.quantity}
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
                </div>
              ))}
              <Link
                to="/buy-sell"
                className="card view-more-button"
                style={{ width: "20rem" }}
              >
                <b>View More</b>
                <i>
                  <FaArrowRight></FaArrowRight>
                </i>
              </Link>
            </div>
          </div>
          <div className="products" id="products">
            <p className="prod_head">Lost Something?</p>
            <div className="card_container">
              {lostFoundProducts?.map((p) => (
                <div className="card" key={p._id}>
                  <LazyLoadImage
                    src={`${BASE_URL}/api/lostfound/product-photo/${p._id}`}
                    className="card-img"
                    alt={p.name}
                    onClick={() =>
                      navigate(!auth.user ? `/login` : `/lostfound/${p._id}`)
                    }
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {formatDate(p.datetime).toLocaleString("en-US", {
                          style: "currency",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}
                    </p>
                    <p className="card-text ">
                      <b>Location: </b>
                      {p.location.substring(0, 30)}
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
              <Link
                to="/lost-found"
                className="card view-more-button"
                style={{ width: "20rem" }}
              >
                <b>View More</b>
                <i>
                  <FaArrowRight></FaArrowRight>
                </i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
