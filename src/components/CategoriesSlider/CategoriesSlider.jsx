import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Style from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="pb-4">
        <h2 className="text-xl text-gray-800 font-light">
          Shop Popular Categories
        </h2>
      </div>

      {categories && categories.length > 0 ? (
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="px-2 focus:outline-none">
              <img
                className="w-full object-cover rounded-lg"
                style={{ height: "200px" }}
                src={category.image}
                alt={category?.name}
              />
              <h3 className="text-center font-light text-sm mt-2 text-gray-700">
                {category.name}
              </h3>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="text-center text-gray-400">No categories available</div>
      )}
    </div>
  );
}
