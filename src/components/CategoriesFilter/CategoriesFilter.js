import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import axiosInstance from '../../common/http'

import './CategoriesFilter.css'

const CategoriesFilter = (props) => {
  const [categories, setCategories] = useState([])
  const { setCurrentCategory, setReset } = props

  const handleCategoryClick = (id) => {
    setCurrentCategory(id)
    setReset(false)
  }

  useEffect(() => {
    axiosInstance
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    //TODO: proper error handling
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="categories-filter">
      <span className="filter-header">Filter by category</span>
      <div class="vertical-menu">
      <div className="filters-wrapper">
        {categories.map((category) => (
          <Button
            variant="link"
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
          >
            <span className="list-cat">{category.name}</span>
          </Button>
        ))}
      </div>
      </div>

      <Button
        variant="outline-danger"
        className="reset"
        onClick={() => setReset(true)}
      >
        Reset Filter
      </Button>
    </div>
  )
}


export default CategoriesFilter

