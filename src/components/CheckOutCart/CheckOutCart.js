import React, { useContext } from "react";
import { CartContext } from "../../common/context/Cart.context";

const CheckOutCart = () => {
  const { checkOutDetails } = useContext(CartContext);

  console.log('checkOutDetails', checkOutDetails)

  return (
    <>
    
    </>
  );
};

export default CheckOutCart;
