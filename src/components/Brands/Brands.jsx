import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Brands() {
  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <i className="fas fa-spinner fa-spin text-green-600 text-3xl"></i>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Something went wrong loading brands 😔
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <h2 className="text-center text-green-600 font-bold text-3xl my-8">
        All Brands
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 w-10/12 mx-auto">
        {data?.data.data.map((brand) => (
          <div
            key={brand._id}
            className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-105"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h3 className="text-center font-semibold text-gray-800">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
