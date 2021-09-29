import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005/api";

function ProductList() {
  const { logInUser, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem("authToken");


  useEffect(() => {
    console.log('user',user)
    // If the token exists in the localStorage
    if (storedToken) {
      console.log("token", storedToken);
      axios
        .get(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products);
          // setCategories(response.categories)
          console.log("response", response);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  }, []);
  return (
    <div className="d-flex flex-row justify-content-between">
      <div id="filter-container col-12 col-md-4">
        <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
          Filter by category
        </span>

        <div className="filters-wrapper">
          {/* Descomentar lo de abajo y arreglar*/}
          {/* {categories.map(category => {
              return (
                <div className="filter-item">
                  <a className="product-filter" href="/shop/filter/{{id}}">
                    {category.name}
                  </a>
                </div>)
            })}  */}
          {/* Borrar lo de abajo */}
          <div className="filter-item">
            <a className="product-filter" href="/shop/filter/{{id}}">
              Categories Names
            </a>
          </div>
          {/* Borrar lo de arriba */}
        </div>
      </div>
      <div className="products-container col-12 col-md-8">
        <div className="products d-flex row justify-content-between gy-4 gx-5">
          {/* Descomentar lo de abajo y arreglar*/}
          {products.length &&
            products.map((product) => {
              return (
                <div
                  className="product col-sm-12 col-md-6 col-lg-3 card"
                  key={product._id}
                >
                  <Link
                    to={`/products/${product._id}`}
                    className="row list"
                  >
                    <img
                      src={product.imageUrl}
                      className="w-100 card-img-top"
                      alt={product.name}
                    />

                    <div className="card-body">
                      <h3 className="card-text text-center">{product.name}</h3>
                      <p className="description card-text text-center">
                        {product.brand}
                      </p>
                      <p className="price card-text text-center">
                        {product.price} €
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
