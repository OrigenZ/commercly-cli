import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../common/context/auth.context";
import axiosInstance from "../../../common/http/index";
import CategoriesFilter from "../../CategoriesFilter/CategoriesFilter";
import ProductEdit from "./ProductEdit";

function ProductsListAdmin() {
  // const { logInUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem("authToken");

  const handleDelete=(id)=>{
    axiosInstance
      .delete(`/api/products/${id}`, 
        { headers: { Authorization: `Bearer ${storedToken}` }}
      )
      .then((response) =>{
        console.log(response.data)

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }
  
  useEffect(() => {
    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products);
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
      <CategoriesFilter />
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
                      <div className="mb-2">

                        <Link
                          to={`/product/edit/${product._id}`} //TODO  pasar a App.js
                          className="btn btn-outline-info edit-btn"
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="mb-0">
                        <div
                          onClick={()=>handleDelete(product._id)}
                          className="btn btn-outline-danger delete-btn"
                        >
                          Delete
                        </div>
                      </div>
                    </div>
     
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductsListAdmin;
