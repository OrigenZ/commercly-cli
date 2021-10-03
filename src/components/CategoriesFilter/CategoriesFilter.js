import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import axiosInstance from '../../common/http'

import './CategoriesFilter.css'

const CategoriesFilter = (props) => {
  const [categories, setCategories] = useState([])
  const { setResults } = props
  const { setCategory } = props

  const getCategories = async () => {
    await axiosInstance
      .get(`/api/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    //TODO: proper error handling
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

      {/* //TODO: check logic of reset button */}

      <div className="filters-wrapper">
        {categories.map((category) => (
          <Button
            variant="link"
            key={category._id}
            className=" d-block p-0 pt-2"
            onClick={() => setCategory(category._id)}
          >
            <span className="list-cat">{category.name}</span>
          </Button>
        ))}
      </div>

        <Button 
          variant="outline-danger"
          className="reset"
          onClick={() => setResults(null)}
        >
          Reset Filter
        </Button>
     
    </div>
  )
}

export default CategoriesFilter
