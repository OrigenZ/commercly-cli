import React from 'react'; 
import { useState, useEffect, useContext } from "react";
// import { AuthContext } from '../../context/auth.context';
import { CartContext } from '../../context/cart.context';
import axios from "axios";
import { useParams } from 'react-router';

const API_URL = "http://localhost:5005/api";

function ProductDetails(props) {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { count, setCount } = useContext(CartContext);
  
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken')
    // Send the token through the request "Authorization" Headers
    const {id} = useParams()
    console.log('id',id)

    useEffect(() => {
      // If the token exists in the localStorage
       
        axios
        .get(`${API_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data);
          // setCategories(response.categories)
          console.log("response", response);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
      } 
    ,[]);
    
    return (
      <div>
      {console.log('props',props)}
      <section
        id="product-details"
        className="container d-flex justify-content-center"
      >
        <div  className="product-card">
          <div className="col-md-12">
            <div className="product-detail card">
              <div className="">
                <img src="{{image.path}}" alt="Product Name" className="w-100" />
              </div>
              <div className="product-body text-center">
                <h3 className="heading heading-5 strong-600 text-capitalize">
                  {products.name} 
                </h3>
                <p className="product-price">{/* {products.price} */} €</p>
                <p className="product-description">Description</p>
                <div className="product-buttons mt-4">
                  <div className="row align-items-center">
                    <form onSubmit={(e)=>e.preventDefault()}>
                      <button onClick={() =>
                        setCount(count+1) //TODO: check this later
                      }
                        type="submit"
                        className="btn btn-outline-success cart-btn"
                      >
                        <i className="fa fa-shopping-cart"></i>&emsp;Add to cart
                      </button>
                      <input type="hidden" value={products.id} name="productId" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
