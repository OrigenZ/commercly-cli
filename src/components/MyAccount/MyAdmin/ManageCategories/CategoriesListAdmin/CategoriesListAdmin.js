import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../../../common/http/index'

const CategoriesListAdmin = () => {
  const [categories, setCategories] = useState([])
  // const [setErrorMessage] = useState(undefined)

  const storedToken = localStorage.getItem('authToken')

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const newCategories = categories.filter(
          (category) => category._id !== id,
        )
        setCategories([...newCategories])
      })
      .catch((err) => {})
  }

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
        .catch((err) => {})
    }
  }, [])

  return (
    <>
      <div id="filter-container col-12 col-md-4">
        <div className="row">
          <Link
            to={`/admin/category/create`}
            className="btn btn-outline-dark col-12"
          >
            Add Category
          </Link>
        </div>
        <div className="row">
          {categories.map((category) => (
            <div key={category._id} className="col-3">
              <div className="filter-item">
                <div
                  className="product-filter"
                  to={`/api/products/filter/${category._id}`}
                >
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div className="mb-2">
                  <Link
                    to={`/admin/category/edit/${category._id}`} //TODO  pasar a App.js
                    className="btn btn-outline-secondary edit-btn w-100"
                  >
                    Edit
                  </Link>
                </div>
                <div className="mb-0">
                  <div
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-outline-danger delete-btn w-100"
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoriesListAdmin
