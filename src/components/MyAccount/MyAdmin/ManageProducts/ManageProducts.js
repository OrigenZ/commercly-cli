import React, { useEffect, useState } from "react";

import CategoriesFilter from "../../../CategoriesFilter/CategoriesFilter";
import SearchProduct from "../../../SearchProduct/SearchProduct";
import ProductsListAdmin from "./ProductsListAdmin/ProductsListAdmin";
import AddProductButton from "./NewProduct/AddProductButton/AddProductButton";

import axiosInstance from "../../../../common/http";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (currentCategory) {
      axiosInstance
        .get(`/api/products/filter/${currentCategory}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setFilteredProducts(response.data);
        })
        .catch((error) => {});
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {});
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row pt-5 ">
      <div className="col-12 col-md-3">
        <AddProductButton />
        <SearchProduct/>
        <CategoriesFilter setCategory={setCurrentCategory}  setFilteredProducts={setFilteredProducts} />
      </div>
      <div className="col-12 col-md-9">
        <ProductsListAdmin
          filteredProducts={filteredProducts}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
}

export default ManageProducts;
