import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../ProductDetails.css";
import toast from "react-hot-toast";

const LostFoundProduct = () => {
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
        `http://localhost:5000/api/lostfound/get-product/${params.id}`
      );
      setProduct(data?.product);
      console.log("product"); 
      console.log(data?.product);
    } catch (error) {
      console.log(error);
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

  return (
    <Layout>
      <div className="product-container">
        <LazyLoadImage
          src={`http://localhost:5000/api/lostfound/product-photo/${product._id}`}
          className="product-image"
          alt={product.name}
          height="300"
          width={"350px"}
        />
        <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">
          {product.datetime? formatDate(product?.datetime):""}
        </p>
        <p className="product-description">{product.description}</p>
        <p className="product-quantity">
          Location: {product.location}
        </p>
      <button className="contact-seller-button">CONTACT</button>
      </div>
      </div>
    </Layout>
  );
};

export default LostFoundProduct;

