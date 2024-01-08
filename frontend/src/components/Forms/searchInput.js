import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [state, setState] = useSearch();
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
        const url = "http://localhost:5000/api/product/search";
        const {data}=await axios.get(`${url}/${state.keyword}`);
        console.log(data);
        setState({...state,results:data});
        navigate("/search");
        
    } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong. Please Try Again");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search"
          value={state.keyword}
          onChange={(e) => setState({ ...state, keyword: e.target.value })}
          style={{
            width:"25vw",
            borderRadius:"2.2vh",
            height:"4.25vh",
            paddingLeft:"0.5vw",
            border:"none",
            backgroundColor:'#f5f9fc',
            color:"#062e58",  
            fontWeight:"bold",
          }}
        ></input>
        <button type="submit" style={{
          paddingTop:"20px",
          margin:"-25px",
          backgroundColor:"transparent",
          border:"none",
          cursor:"pointer"
        }}><div><FaSearch></FaSearch></div></button>
      </form>
    </div>
  );
};

export default SearchInput;
