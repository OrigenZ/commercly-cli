import React from 'react'
import { Link } from 'react-router-dom'

import './AddCategoryButton.css'

const AddCategoryButton = () => {
  return (
    <Link to={`/my-account/admin/category/create`} className="btn btn-outline-success" id="add-cat">
      Add Category
    </Link>
  )
}

export default AddCategoryButton
