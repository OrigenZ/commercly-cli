// TODO: Debería mostrar lista de productos, cantidad (editable) = eliminar producto

import React, { useContext } from 'react'
import { CartContext } from '../../common/context/Cart.context'

function ShoppingCart() {
  const { cart } = useContext(CartContext)

  console.log(cart)

  return (
    <div className="section container text-center">
      {cart &&
        cart.products.map((product) => (
          <p key={`${product._id}${Math.random() * 1000}`}>
            id producto: {product.name}
          </p>
          //TODO: for a better way to do this shit
        ))}
    </div>
  )
}

export default ShoppingCart
