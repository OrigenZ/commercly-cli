import React from 'react'
import { Link } from 'react-router-dom'

const AddProductButton = () => {
    return (
        <Link to={`/admin/product/create`} className="btn btn-outline-dark mb-4">
        Add product
      </Link>
    )
}

export default AddProductButton
