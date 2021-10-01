import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../common/http'

import './CategoriesFilter.css'

const CategoriesFilter = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
        })
        .catch((error) => {})
    }
  }, [])

  return (
    <div id="filter-container col-12 col-md-4">
      <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
        Filter by category
      </span>

      <div className="filters-wrapper">
        {categories.map((category) => (
          <div key={category._id}>
            <Link
              className="list-cat text-muted"
              to={`/api/products/filter/${category._id}`}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesFilter
