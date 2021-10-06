import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../http/index";
import { AuthContext } from "../context/Auth.context";

const CartContext = React.createContext();

const CartProviderWrapper = (props) => {
  const [cart, setCart] = useState(null);
  const [count, setCount] = useState(0);
  const [checkOutDetails, setCheckOutDetails] = useState(null);

  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setCart(response.data))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/api/cart/${user._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          let itemsCounter = {};
          let productsArray = [];
          let totalItems = 0;
          let totalPrice = 0;
          let totalBasePrice = 0;

          response.data.products.forEach((obj) => {
            const key = JSON.stringify(obj);
            itemsCounter[key] = (itemsCounter[key] || 0) + 1;
          });

          itemsCounter = Object.entries(itemsCounter);


          for (const item of itemsCounter) {
            const product = JSON.parse(item[0]);
            const quantity = item[1];
            const totalLine = quantity * product.totalPrice;
            const totalBaseLine = quantity * product.price;

            totalItems += item[1];
            totalPrice += totalLine;
            totalBasePrice += totalBaseLine

            productsArray.push({
              productId: product._id,
              product: product,
              quantity: quantity,
              totalLine: totalLine,
              totalBaseLine: totalBaseLine
            });
          }


          const billing =
            user.addresses && user.addresses.billing
              ? user.addresses.billing
              : null;



          const details = {
            products: productsArray,
            totalItems: totalItems,
            totalPrice: totalPrice,
            totalBasePrice: totalBasePrice,
            billing,
          };

          // setCart(response.data);
          setCheckOutDetails(details);
        })
        .catch((err) => console.log(err));
    } else {
      setCount(0);
      setCart(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        count,
        setCount,
        checkOutDetails,
        setCheckOutDetails,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartProviderWrapper, CartContext };
