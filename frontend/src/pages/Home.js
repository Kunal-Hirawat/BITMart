import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout/Layout';
import "../Home.css"

const Home = ()=>{
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const { data } = await axios.get("http://localhost:5000/api/product/get-product");
            // console.log(data.products);
            setProducts(data.products);
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

  // Fetch products from the backend
  useEffect(() => {
        getProducts();
  }, []);
  const latestProducts = products.slice(-4);

    return (
        <Layout>
            <div className='welcome'>
                 <h2>Welcome to BITMart</h2>
                 <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan quam ac nisl sodales, eu dictum metus luctus. 
                    Maecenas et tincidunt dui. In id mattis est, sed congue tortor. Cras vitae quam ut sem elementum ultrices vel et felis.
                     Mauris condimentum lectus vel dui dapibus.
                </p>  
            </div>
            <div className='products'>
                <h2 className='prod_head'>Latest Products</h2>
                <div className='card_container'>
                {latestProducts?.map( p => (
        
                        <div className="card" style={{width: '28rem'}}>
                            <img src={`http://localhost:5000/api/product/product-photo/${p._id}`} className="card-img" alt={p.name}/>
                            <div className="card-body">
                               <h3 className="card-title">{p.name}</h3>
                               <p className="card-text">{p.description} </p>
                               <p className="card-text">Price : {p.price} </p>
                               <p className="card-text">Quantity : {p.quantity} </p>
                               <p className="card-text">Contact : {p.contact} </p>   
                            </div>
                        </div>
                    ))
                }
                </div>
                

                    <Link to="/buy-sell" className='more-btn'>
                    <button>For More Prodcuts Click Here</button>
                    </Link>
                  
               
                </div>
        </Layout>
    );
};

export default Home;