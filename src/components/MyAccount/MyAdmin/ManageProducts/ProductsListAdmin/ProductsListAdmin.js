import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../../common/http/index";

import "./ProductListAdmin.css";

function ProductsListAdmin() {
  // const { logInUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [setErrorMessage] = useState(undefined);

  const storedToken = localStorage.getItem("authToken");

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts([...newProducts]);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
    }
  }, []);

  return (
    <div className="row">
      {products.length &&
        products.map((product) => {
          return (
            <div
              className="product col-sm-12 col-md-6 col-lg-3 card"
              key={product._id}
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
                <p className="price card-text text-center">{product.price} €</p>
                <div className="mb-2">
                  <Link
                    to={`/admin/product/edit/${product._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-info edit-btn w-100"
                  >
                    Edit
                  </Link>
                </div>
                <div className="mb-0">
                  <div
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-outline-danger delete-btn w-100"
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProductsListAdmin;
