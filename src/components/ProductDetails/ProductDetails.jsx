import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import toast from "react-hot-toast";

import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false); // Loader عند جلب البيانات
  const [addingToCart, setAddingToCart] = useState(false); // Loader عند الضغط على Add To Cart

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function fetchProductDetails(productId) {
    try {
      setLoadingProduct(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
      );
      setProductDetails(data.data);
      fetchRelatedProducts(data.data.category._id);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProduct(false);
    }
  }

  async function fetchRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      );
      setRelatedProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddToCart(productId) {
    setAddingToCart(true);
    try {
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
    } catch (err) {
      toast.error("Something went wrong", {
        duration: 1000,
        position: "top-right",
      });
    } finally {
      setAddingToCart(false);
    }
  }

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }

  return (
    <>
      <div className="row mt-5">
        {/* Product Images */}
        <div className="w-1/4">
          <Slider {...settings}>
            {productDetails?.images?.map((src, index) => (
              <img key={index} src={src} alt={productDetails?.title} />
            ))}
          </Slider>
        </div>

        {/* Product Details */}
        <div className="w-3/4 p-6">
          <h1 className="text-lg font-normal text-gray-950 mb-4">
            {productDetails?.title}
          </h1>
          <p className="text-gray-700 font-light">
            {productDetails?.description}
          </p>
          <div className="flex justify-between my-4">
            <span>{productDetails?.price} EGP</span>
            <span className="mb-2">
              {productDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-500"></i>
            </span>
          </div>
          <button
            onClick={() => handleAddToCart(productDetails._id)}
            disabled={addingToCart}
            className="btn px-5"
          >
            {addingToCart ? (
              <i className="fas fa-spinner fa-spin text-white text-xl"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-xl text-center font-semibold mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts
            .filter((product) => product._id !== id)
            .map((product) => (
              <Link
                to={`/productdetails/${product._id}`}
                key={product._id}
                className="border rounded shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="mb-2 w-full h-60 object-cover rounded"
                />
                <h4 className="font-medium text-gray-800 truncate">
                  {product.title}
                </h4>
                <p className="text-green-600">{product.price} EGP</p>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
