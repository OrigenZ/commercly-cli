import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../common/context/auth.context";
import axiosInstance from "../../../common/http/index";

function ProductsListAdmin() {
  // const { logInUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [setErrorMessage] = useState(undefined);
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  console.log("user", user);

  useEffect(() => {
    // If the token exists in the localStorage
    if (storedToken) {
      console.log("token", storedToken);
      axiosInstance
        .get(`/api/products`, {
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
                  <a href="/products/{{id}}">
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
                      <form
                        action={`/products/edit/product._id`}
                        method="get"
                        className="mb-2"
                      >
                        <button
                          type="submit"
                          className="btn btn-outline-info edit-btn "
                        >
                          Edit
                        </button>
                      </form>
                      <form
                        action="/products/delete/{{id}}"
                        method="post"
                        className="mb-0"
                      >
                        <button
                          type="submit"
                          className="btn btn-outline-danger delete-btn"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductsListAdmin;
