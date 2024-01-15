import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import "../ProductDetails.css"
import toast from "react-hot-toast";

const Product = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});


  //initalp details
  useEffect(() => {
    if (params?.id) getProduct();
  }, [params?.id]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${params.id}`
      );
      setProduct(data?.product);
      //   getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

    return (
    <Layout>
      {/* console.log({product._id}); */}
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:5000/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <button
            className="submit-button2"
            onClick={() => {
              const items = JSON.parse(localStorage.getItem("cart"))
              let exists = false

              for (const item of items) {
                if (item?._id === product?._id) {
                  exists = true
                  break
                }
              }
              if (exists) {
                toast.error("Item already exists in favourites")
              }
              else {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to favourites");
              }
            }}
          >
            ADD TO FAVOURITES
          </button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default Product;

///  1 2 3 4 