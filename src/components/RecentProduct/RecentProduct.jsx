import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function RecentProduct() {
  const { addProductToCart } = useContext(CartContext);
  const [currentProductID, setCurrentProductID] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  async function handleAddProduct(productId) {
    setAddingToCart(true);
    setCurrentProductID(productId);
    try {
      const response = await addProductToCart(productId);
      if (response?.data?.status === "success") {
        toast.success(response.data.message || "Added to cart", {
          duration: 1000,
          position: "top-right",
        });
      } else {
        toast.error(response?.data?.message || "Error adding product", {
          duration: 1000,
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        duration: 1000,
        position: "top-right",
      });
    } finally {
      setAddingToCart(false);
      setCurrentProductID(null);
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: async () => {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      return Array.isArray(res.data.data) ? res.data.data : [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600 font-semibold">
        {error?.message || "Something went wrong"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 font-medium">
        No products found.
      </div>
    );
  }

  return (
    <div className="row flex flex-wrap -mx-4">
      {Array.isArray(data) &&
        data?.map((product) => (
          <div
            key={product?.id}
            className="sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
          >
            <div className="product py-4 p-4 rounded-xl shadow-md">
              <Link to={`/productdetails/${product?.id}`}>
                <img
                  src={product?.imageCover || "https://via.placeholder.com/200"}
                  alt={product?.title || "Product"}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <span className="block font-light mt-2 text-green-600">
                  {product?.category?.name || "Category"}
                </span>
                <h3 className="text-lg font-normal mb-4 text-gray-700">
                  {product?.title
                    ? product.title.split(" ").slice(0, 2).join(" ")
                    : "Product"}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product?.price ?? 0} EGP</span>
                  <span className="mb-2">
                    {product?.ratingsAverage ?? 0}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </Link>
              <button
                className="btn px-5 mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
                onClick={() => handleAddProduct(product.id)}
                disabled={addingToCart && currentProductID === product.id}
              >
                {addingToCart && currentProductID === product.id ? (
                  <i className="fas fa-spinner fa-spin text-white"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
