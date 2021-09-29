import React, { useState } from 'react'

const CartContext = React.createContext()

function CartProviderWrapper(props) {
  const [count, setCount] = useState(0)

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartProviderWrapper, CartContext }
