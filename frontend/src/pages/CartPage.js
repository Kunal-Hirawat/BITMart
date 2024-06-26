import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import "../components/styles/CartStyles.css";
import { BASE_URL } from "../url.js";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row0">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello There !"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You have ${cart.length} items in your favourites ${
                      auth?.token ? "" : "Please Login To Checkout !"
                    }`
                  : " You have no items added to your favourites !"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row0">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row0 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${BASE_URL}/api/product/product-photo/${p._id}`}
                      className="card-img-top cart-img"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>Item : {p.name}</p>
                    <p>Description : {p.description}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="danger-btn"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
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

export default CartPage;
