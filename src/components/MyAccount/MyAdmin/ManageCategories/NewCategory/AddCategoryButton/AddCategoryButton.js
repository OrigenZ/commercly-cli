import React from 'react'
import { Link } from 'react-router-dom'

import './AddCategoryButton.css'

const AddCategoryButton = () => {
  return (
    <Link to={`/admin/category/create`} className="btn btn-outline-dark col-12">
      Add Category
    </Link>
  )
}

export default AddCategoryButton
