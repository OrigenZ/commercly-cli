import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../http/index";
import { AuthContext } from "../context/Auth.context";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
  const [cart, setCart] = useState(null);
  const [count, setCount] = useState(0)

  const storedToken = localStorage.getItem('authToken')
  const { user } = useContext(AuthContext);  

  useEffect(() => {
    if(user){
    axiosInstance
      .get(`/api/cart/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCart(response.data))
      .catch((err) => console.log(err));
    }else{
      setCount(0)
      setCart(null)
    }
  }, [ storedToken, user]);

  return (
    <CartContext.Provider value={{ cart, setCart, count, setCount }}>
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProviderWrapper, CartContext };
