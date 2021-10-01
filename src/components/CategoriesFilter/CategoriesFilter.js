import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../common/http";

import "./CategoriesFilter.css";

const CategoriesFilter = (props) => {
  const [categories, setCategories] = useState([]);
  const {setFilteredProducts} = props
  const {setCategory} = props
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {});
    }
  }, []);

  return (
    <div id="filter-container col-12 col-md-4">
      <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
        Filter by category
      </span>
      <div className="clear-filters">
        <button className=" text-muted" onClick={()=>setFilteredProducts([])}> 
          Reset Filter
        </button>
      </div>

      {/* //TODO: check logic of reset button */}

      <div className="filters-wrapper">
        {categories.map((category) => (
          <button key={category._id}  onClick={()=>setCategory(category._id)}>
            <div className="list-cat text-muted">{category.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesFilter;
