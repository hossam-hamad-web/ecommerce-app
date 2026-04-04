import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";

export default function Products() {
  const { addProductToCart } = useContext(CartContext);

  const [loadingId, setLoadingId] = useState(null);

  const { data, isError, isLoading, error } = useProducts();

  async function handleAddToCart(productId) {
    setLoadingId(productId);

    const response = await addProductToCart(productId);

    if (response?.data?.status === "success") {
      toast.success(response.data.message, {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error(response?.data?.message || "Error adding product", {
        duration: 1000,
        position: "top-right",
      });
    }

    setLoadingId(null);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 w-full flex justify-center">
        <h3 className="text-red-500">
          {error?.message || "Something went wrong"}
        </h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="row mt-10">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="sm:w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8"
          >
            <div className="product p-4 rounded-xl shadow-md h-full flex flex-col">
              <Link to={`/productdetails/${product.id}`} className="flex-1">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full object-cover mb-2"
                />

                <span className="block font-light text-green-600">
                  {product.category.name}
                </span>

                <h3 className="text-lg font-normal mb-2 text-gray-700">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>

                <div className="flex justify-between items-center mb-3">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </Link>

              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={loadingId === product.id}
                className="btn mt-auto"
              >
                {loadingId === product.id ? (
                  <i className="fas fa-spinner fa-spin text-white text-xl"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
