import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  async function getUserCartProducts() {
    let res = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    if (res) {
      setCartCount(res?.data.numOfCartItems);
    }
  }

  useEffect(() => {
    getUserCartProducts();
  }, []);

  return (
    <cartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </cartContext.Provider>
  );
}
