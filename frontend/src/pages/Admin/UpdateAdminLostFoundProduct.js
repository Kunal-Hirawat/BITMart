import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../../components/styles/CartStyles.css";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";

const UpdateAdminLostFound = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const [auth, setAuth] = useAuth();
  

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lostfound/get-product/${params.id}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setLocation(data.product.location);
      setDatetime(data.product.datetime);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("location", location);
      productData.append("datetime", datetime);
      photo && productData.append("photo", photo);
      const { data } = axios.put(
        `http://localhost:5000/api/lostfound/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are You Sure want to delete this product ? "
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:5000/api/lostfound/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="dashboard-body">
      <div className="menu-layout">
        <AdminMenu />

        <div className="form ">
          <form className="form-container-2">
            <h1>Update/Delete Product</h1>
            <div className="d-flex flex-wrap">
              <div className="m-1 w-75">
                <div className="mb-3">
                  <label className="submit-button1">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`http://localhost:5000/api/lostfound/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={location}
                    placeholder="enter location"
                    className="form-control"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="datetime-local"
                    value={datetime}
                    placeholder="enter date and time"
                    className="form-control"
                    onChange={(e) => setDatetime(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="submit-button1" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="danger-btn" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default UpdateAdminLostFound;
