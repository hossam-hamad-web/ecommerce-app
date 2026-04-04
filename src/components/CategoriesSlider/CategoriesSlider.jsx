import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import Style from "./CategoriesSlider.module.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories",
      );
      setCategories(data.data);
    } catch (err) {
      console.error(err);
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
    <>
      <div className="py-5">
        <h2 className="py-4 text-xl text-gray-800 font-light">
          Shop Popular Categories
        </h2>
      </div>

      <Slider {...settings}>
        {categories?.map((category) => (
          <div key={category._id} className="mt-10">
            <img
              className="category-img w-full"
              src={category.image}
              alt={category?.name}
            />
            <h3 className="text-center font-light">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
