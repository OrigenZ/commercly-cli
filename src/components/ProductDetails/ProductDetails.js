import React from "react";
import { useState, useEffect, useContext } from "react";
// import { AuthContext } from '../../common/context/auth.context';
import { CartContext } from "../../common/context/cart.context";
import { useParams } from "react-router";

import axiosInstance from "../../common/http/index";

function ProductDetails(props) {
  const [products, setProducts] = useState([]);
  const [setErrorMessage] = useState(undefined);
  const { count, setCount } = useContext(CartContext);

  // Get the token from the localStorage
  // Send the token through the request "Authorization" Headers
  const { id } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    axiosInstance
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProducts(response.data);
        // setCategories(response.categories)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  return (
    <div>
      <section
        id="product-details"
        className="container d-flex justify-content-center"
      >
        <div className="product-card">
          <div className="col-md-12">
            <div className="product-detail card">
              <div className="">
                <img
                  src={products.imageUrl}
                  alt="Product Name"
                  className="w-100"
                />
              </div>
              <div className="product-body text-center">
                <h3 className="heading heading-5 strong-600 text-capitalize">
                  {products.name}
                </h3>
                <p className="product-price">{products.price} €</p>
                <p className="product-description">{products.description} </p>
                <div className="product-buttons mt-4">
                  <div className="row align-items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <button
                        onClick={
                          () => setCount(count + 1) //TODO: check this later
                        }
                        type="submit"
                        className="btn btn-outline-success cart-btn"
                      >
                        <i className="fa fa-shopping-cart"></i>&emsp;Add to cart
                      </button>
                      <input
                        type="hidden"
                        value={products.id}
                        name="productId"
                      />
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
