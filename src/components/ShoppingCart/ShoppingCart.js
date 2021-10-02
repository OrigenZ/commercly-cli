
import React, { useContext } from 'react'
import { CartContext } from '../../common/context/Cart.context'

const ShoppingCart = () => {
  const { cart } = useContext(CartContext)

  console.log('cart', cart)

  return (
    <div className="section container text-center">
      {cart &&
        cart.products.map((product) => (
          <p key={`${product._id}${Math.random() * 1000}`}>
            {product.name} - cantidad modificable - {product.price}€
          </p>
          //TODO: for a better way to do this shit
        ))}
    </div>
  )
}

export default ShoppingCart
