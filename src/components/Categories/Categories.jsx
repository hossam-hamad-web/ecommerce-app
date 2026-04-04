import { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  function getCategoties() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getCategoties();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );
  }
  return (
    <>
      <div className="text-center mt-12">
        <h1 className="text-2xl text-green-600 font-bold">Categories</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10 px-4">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="max-w-sm mt-10 sm:w-1/2 md:w-1/3 lg:w-1/4 hover:bg-slate-700 transition-all cursor-pointer   bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <img
              className="rounded-t-lg w-full h-56 object-cover "
              src={category.image}
              alt={category.slug}
            />
            <div className="p-5 ">
              <a href="#">
                <h5 className=" hover:text-white mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {category.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Our Categories.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
