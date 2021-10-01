import React, { useEffect, useState } from "react";

import ProductList from "./ProductsList/ProductsList";
import SearchProduct from "../SearchProduct/SearchProduct";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import axiosInstance from "../../common/http";

import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [foundProducts, setFoundProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

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
  }, [currentCategory, storedToken]);

  useEffect(() => {
    if (currentSearch) {
      axiosInstance
        .get(`/api/products/search/${currentSearch}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log('response', response.data)
          setFoundProducts(response.data);
        })
        .catch((error) => {});
    }
  }, [currentSearch, storedToken]);

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
  }, []);

  return (
    <div>
      <section className="container" id="shop">
        <div className="d-flex flex-row justify-content-start">
          <div className="products-container col-12 col-md-3 ">
            <SearchProduct setCurrentSearch={setCurrentSearch}/>
            <CategoriesFilter
              setCategory={setCurrentCategory}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
          <div className="products-container col-12 col-md-9">
            <ProductList
              filteredProducts={filteredProducts}
              products={products}
              foundProducts={foundProducts}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
