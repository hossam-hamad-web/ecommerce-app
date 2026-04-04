import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartDetails, setcartDetails] = useState(null);
  const token = localStorage.getItem("userToken");

  async function getLoggedUserCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token },
        },
      );
      setcartDetails(response.data.data);

      return response;
    } catch (error) {}
  }

  async function addProductToCart(productid) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productid },
        { headers: { token } },
      );
      // ✅ بعد الإضافة، نجيب أحدث cart
      await getLoggedUserCart();
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async function updateCartItemCount(productId, count) {
    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: { token } },
    );
    return getLoggedUserCart(); // ✅ تحديث تلقائي بعد التعديل
  }

  async function deleteProudctItem(productId) {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: { token },
      },
    );
    return getLoggedUserCart(); // ✅ cart جديد بعد الحذف
  }

  async function clearCartItems() {
    await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token },
    });
    return getLoggedUserCart();
  }

  return (
    <CartContext.Provider
      value={{
        cartDetails,
        setcartDetails,
        getLoggedUserCart,
        addProductToCart,
        updateCartItemCount,
        deleteProudctItem,
        clearCartItems,
        setcartDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
