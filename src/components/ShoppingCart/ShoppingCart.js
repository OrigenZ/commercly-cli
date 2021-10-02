import React, { useContext } from "react";

import { CartContext } from "../../common/context/Cart.context";
import axiosInstance from "../../common/http";

const ShoppingCart = () => {
  const { checkOutDetails, cart, setCart } = useContext(CartContext);
  const storedToken = localStorage.getItem("authToken");
  console.log("checkOutDetails", checkOutDetails);

  const handleEditItem = (id, operator) => {
    const param = operator === "+" ? "add-item" : "remove-item";
    const body = { productId: id, cartId: cart._id };
    axiosInstance
      .post(`/api/cart/${param}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCart(response.data);
      });
  };

  return (
    <div className="section container text-center">
      {checkOutDetails &&
        checkOutDetails.products.map((line) => (
          <div key={`${line.product._id}${Math.random() * 1000}`}>
            <button onClick={() => handleEditItem(line.product._id, "-")}>
              {" "}
              -{" "}
            </button>
            {line.quantity}
            <button onClick={() => handleEditItem(line.product._id, "+")}>
              {" "}
              +{" "}
            </button>{" "}
            x {line.product.name} - {line.totalLine}€
          </div>
          //TODO: for a better way to do this shit
        ))}
       <div>Total: {checkOutDetails.totalPrice} €</div> 
    </div>
  );
};

export default ShoppingCart;
