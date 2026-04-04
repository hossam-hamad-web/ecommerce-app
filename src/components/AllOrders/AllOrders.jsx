import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

export default function Cart() {
  const {
    getLoggedUserCart,
    updateCartItemCount,
    deleteProudctItem,
    clearCartItems,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  async function getCartItems() {
    setLoading(true);
    try {
      let response = await getLoggedUserCart();
      setCartDetails(response.data.data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateCartCount(productId, count) {
    if (count < 1) return;
    setActionLoading(true);
    try {
      let response = await updateCartItemCount(productId, count);
      setCartDetails(response.data.data);
    } catch (err) {
      console.error("Failed to update count:", err);
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteItem(productId) {
    setActionLoading(true);
    try {
      let response = await deleteProudctItem(productId);
      setCartDetails(response.data.data);
    } catch (err) {
      console.error("Failed to delete item:", err);
    } finally {
      setActionLoading(false);
    }
  }

  async function clearItems() {
    setActionLoading(true);
    try {
      await clearCartItems();
      setCartDetails({ products: [], totalCartPrice: 0 });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }

  if (!cartDetails || cartDetails.products.length === 0) {
    return (
      <p className="text-center text-gray-600 font-medium mt-10">
        Your cart is empty.
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="mt-8 px-4 md:px-0">
        {/* Total Price & Clear */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h3 className="text-green-600 font-semibold text-lg">
            Total Price: {cartDetails.totalCartPrice} EGP
          </h3>
          <button
            onClick={clearItems}
            disabled={actionLoading}
            className="bg-green-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    {product.product.title}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count - 1)
                        }
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCartCount(product.product.id, product.count + 1)
                        }
                        className="px-2 py-1 bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-semibold">
                    {product.price} EGP
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteItem(product.product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {cartDetails.products.map((product) => (
            <div
              key={product.product.id}
              className="bg-white rounded shadow p-4 flex flex-col gap-2"
            >
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                className="w-32 mx-auto"
              />
              <h3 className="font-semibold text-center">
                {product.product.title}
              </h3>
              <p className="text-center font-medium">{product.price} EGP</p>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() =>
                    updateCartCount(product.product.id, product.count - 1)
                  }
                  className="px-3 py-1 bg-gray-100 rounded"
                >
                  -
                </button>
                <span>{product.count}</span>
                <button
                  onClick={() =>
                    updateCartCount(product.product.id, product.count + 1)
                  }
                  className="px-3 py-1 bg-gray-100 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => deleteItem(product.product.id)}
                className="text-red-600 font-semibold hover:underline w-full mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <Link
          to="/checkout"
          className="block w-fit mx-auto mt-6 bg-green-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded uppercase transition"
        >
          Next Step
        </Link>
      </div>
    </>
  );
}
