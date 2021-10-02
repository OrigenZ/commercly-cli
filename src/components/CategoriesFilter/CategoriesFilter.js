import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import axiosInstance from '../../common/http'

import './CategoriesFilter.css'

const CategoriesFilter = (props) => {
  const [categories, setCategories] = useState([])
  const { setResults } = props
  const { setCategory } = props
  const storedToken = localStorage.getItem('authToken')

  const getCategories = async () => {
    if (storedToken) {
      await axiosInstance
        .get(`/api/categories`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setCategories(response.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
      //TODO: proper error handling
    }
  }

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="filter-container col-12 col-md-4">
      <span className="filter-header text-uppercase border-bottom mb-2 d-inline-block">
        Filter by category
      </span>
      <div className="clear-filters">
        <Button
          variant="light"
          className=" text-muted"
          onClick={() => setResults(null)}
        >
          Reset Filter
        </Button>
      </div>

      {/* //TODO: check logic of reset button */}

      <div className="filters-wrapper">
        {categories.map((category) => (
          <Button
            variant="link"
            key={category._id}
            className=" d-block p-0 pt-3"
            onClick={() => setCategory(category._id)}
          >
            <span className="list-cat text-muted">{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoriesFilter
