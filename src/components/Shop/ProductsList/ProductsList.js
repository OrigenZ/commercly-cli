import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axiosInstance from '../../../common/http/index'

import './ProductList.css'

function ProductList() {
  const [products, setProducts] = useState([])
  // const [errorMessage, setErrorMessage] = useState('')
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
        .catch((error) => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="products d-flex row justify-content-start ">
      {products.length &&
        products.map((product) => {
          return (
            <Card
              id="card-products"
              className="col-sm-12 col-md-6 col-lg-3"
              key={product._id}
            >
              <Link to={`/products/${product._id}`} className="row list">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="w-100"
                    alt={product.name}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    <p className="text-center">{product.brand}</p>
                    <p className="text-center">{product.price} €</p>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card>
          )
        })}
    </div>
  )
}

export default ProductList
