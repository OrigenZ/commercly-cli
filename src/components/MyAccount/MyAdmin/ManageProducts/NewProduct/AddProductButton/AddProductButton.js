import React from 'react'
import { Link } from 'react-router-dom'

import './AddProductButton.css'

const AddProductButton = () => {
    return (
        <Link to={`/admin/product/create`} className="btn btn-outline-dark mb-4 corners">
        Add product
      </Link>
    )
}

export default AddProductButton
