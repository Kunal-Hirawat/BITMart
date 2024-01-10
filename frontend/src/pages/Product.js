import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../ProductDetails.css"

const Product = () => {
  const params = useParams();

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
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default Product;

///  1 2 3 4 