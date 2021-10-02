import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../common/context/Cart.context'
import { useParams } from 'react-router'

import axiosInstance from '../../common/http/index'

const ProductDetails = (props) => {
  const [product, setProduct] = useState([])
  const [setErrorMessage] = useState(undefined)
  const { cart, setCart, count, setCount } = useContext(CartContext)

  const { id } = useParams()

  const storedToken = localStorage.getItem('authToken')

  const handleCartItem = () => {
    /* id carrito y id producto */
    const body = { productId: product._id, cartId: cart._id }
    axiosInstance
      .post(`/api/cart/add-item`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log('response data', response.data)
        setCart(response.data)
      })
  }

  useEffect(() => {
    setCount(cart.products.length)
    console.log('Test')
  })

  useEffect(() => {
    axiosInstance
      .get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log('response', response.data)
        setProduct(response.data)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <section
        id="product-details"
        className="container d-flex justify-content-center"
      >
        <div className="product-card">
          <div className="col-md-12">
            <div className="product-detail card">
              <div className="">
                <img
                  src={product.imageUrl}
                  alt="Product Name"
                  className="w-100"
                />
              </div>
              <div className="product-body text-center">
                <h3 className="heading heading-5 strong-600 text-capitalize">
                  {product.name}
                </h3>
                <p className="product-price">{product.price} €</p>
                <p className="product-description">{product.description} </p>
                <div className="product-buttons mt-4">
                  <div className="row align-items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <button
                        onClick={handleCartItem} //TODO: check this later
                        type="submit"
                        className="btn btn-outline-success cart-btn"
                      >
                        <i className="fa fa-shopping-cart"></i>&emsp;Add to cart
                      </button>
                      <input
                        type="hidden"
                        value={product.id}
                        name="productId"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
