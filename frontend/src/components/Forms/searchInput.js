import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { FaSearch } from "react-icons/fa";
import { BASE_URL } from "../../url";
import "./searchInput.css";

const SearchInput = () => {
  const [state, setState] = useSearch();
  const [type, setType] = useState("All");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchBuySell = async () => {
    try {
      const url = `${BASE_URL}/api/product/search`;
      const { data } = await axios.get(`${url}/${keyword}`);
      setState({
        ...state,
        BuySellResults: data,
        LostFoundResults: [],
        type: type,
        keyword: keyword,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  const searchLostFound = async () => {
    try {
      const url = `${BASE_URL}/api/lostfound/search`;
      const { data } = await axios.get(`${url}/${keyword}`);
      setState({
        ...state,
        LostFoundResults: data,
        BuySellResults: [],
        type: type,
        keyword: keyword,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  const searchBoth = async () => {
    try {
      const { data: lostFoundData } = await axios.get(
        `${BASE_URL}/api/lostfound/search/${keyword}`
      );
      const { data: buySellData } = await axios.get(
        `${BASE_URL}/api/product/search/${keyword}`
      );
      setState({
        ...state,
        LostFoundResults: lostFoundData,
        BuySellResults: buySellData,
        type: type,
        keyword: keyword,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!keyword) {
        return;
      }
      if (type == "BuySell") {
        searchBuySell();
      } else if (type === "LostFound") {
        searchLostFound();
      } else {
        searchBoth();
      }
      navigate("/search");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong. Please Try Again");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-form-div">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="search-select"
          >
            <option value="All" default>
              All
            </option>
            <option value="BuySell">Buy/Sell</option>
            <option value="LostFound">Lost/Found</option>
          </select>
        </div>
        <div className="search-form-div">
          <input
            type="search"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          ></input>
        </div>
        <div className="search-form-div">
          <button type="submit">
            <div className="search-icon-div">
              <FaSearch className="search-icon"></FaSearch>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
