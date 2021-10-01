import { useState } from "react";

import axiosInstance from "../../../../../common/http/index";
import ProductCard from "../../../../ProductCard/ProductCard";
import "./ProductListAdmin.css";

function ProductsListAdmin(props) {
  const { filteredProducts, products, setProducts } = props;
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
  //TODO: Make a Card component
  return (
    <div className="row">
      {!filteredProducts.products &&
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={false}
            />
          );
        })}
      {filteredProducts.products &&
        filteredProducts.products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleDelete={handleDelete}
              isShop={false}
            />
          );
        })}
      {filteredProducts.products && filteredProducts.products.length === 0 && (
        <p>No hay productos</p> //TODO: Message
      )}
    </div>
  );
}

export default ProductsListAdmin;
