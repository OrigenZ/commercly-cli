import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../../common/http/index'

function ProductList() {
  const [products, setProducts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const storedToken = localStorage.getItem('authToken')

  useEffect(() => {
    // If the token exists in the localStorage
    if (storedToken) {
      axiosInstance
        .get(`/api/products`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProducts(response.data.products)
        })
        .catch((error) => {
          const errorDescription = error.response.data.message
          setErrorMessage(errorDescription)
        })
    }
  }, [])
  return (
    <div className="products d-flex row justify-content-start ">
      {products.length &&
        products.map((product) => {
          return (
            <div
              className="product col-sm-12 col-md-6 col-lg-3 card"
              key={product._id}
            >
              <Link to={`/products/${product._id}`} className="row list">
                <img
                  src={product.imageUrl}
                  className="w-100 card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h3 className="card-text text-center">{product.name}</h3>
                  <p className="description card-text text-center">
                    {product.brand}
                  </p>
                  <p className="price card-text text-center">
                    {product.price} €
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default ProductList
