import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../common/http'


const CategoriesFilter = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
      const storedToken = localStorage.getItem("authToken");
    // If the token exists in the localStorage
    if (storedToken) {
      console.log("token", storedToken);
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
          console.log("response", response);
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          console.log(errorDescription);
        });
    }
  }, []);

    return (
        <div id="filter-container col-12 col-md-4">
        <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
          Filter by category
        </span>

        <div className="filters-wrapper">
        {categories.map((category)=> 
            <div key={category._id} className="filter-item">
            <Link className="product-filter" 
            to={`/api/products/filter/${category._id}`}>
              {category.name}
            </Link>
          </div>
          )}
        </div>
      </div>
    )
}

export default CategoriesFilter
