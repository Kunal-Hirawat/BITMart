import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { RiHeart3Fill } from "react-icons/ri";
import "../Home.css";

const Home = () => {
  const [auth] = useAuth();
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/product/get-product"
      );
      // console.log(data.products);
      setProducts(data.products);
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

      if(items.length){
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
        toast("Product removed from favourites",{icon:'🥺'});
      } else {
        setCart([...cart, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
        toast("Product added to favourites",{icon:'❤️'});
      }
    }
  };

  // Fetch products from the backend
  useEffect(() => {
    getProducts();
  }, []);
  const latestProducts = products.slice(-4);
  
  useEffect(() => {
    const initialWishlistState = {};
    const items = JSON.parse(localStorage.getItem("cart")) || [];

      if(items.length){
        for (const item of items) {
          initialWishlistState[item._id]=true;
        }
      }
    setWishlist(initialWishlistState);
  }, [cart]);

  return (
    <Layout>
      <div className="welcome">
        {/* <h2>Welcome to BITMart</h2> */}
        {/* <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan quam ac nisl sodales, eu dictum metus luctus. 
                    Maecenas et tincidunt dui. In id mattis est, sed congue tortor. Cras vitae quam ut sem elementum ultrices vel et felis.
                     Mauris condimentum lectus vel dui dapibus.
                </p> */}
      </div>
      <div className="products">
        <h2 className="prod_head">Latest Products</h2>
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
                <img
                  src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                  className="card-img"
                  alt={p.name}
                />
                <div className="card-body">
                  <h3 className="card-title">{p.name}</h3>
                  <p className="card-text">Desc : {p.description} </p>
                  <p className="card-text">Price : {p.price} </p>
                  <p className="card-text">Quantity : {p.quantity} </p>
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
        </div>

        <Link to="/buy-sell" className="more-btn">
          <button>For More Products Click Here</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
