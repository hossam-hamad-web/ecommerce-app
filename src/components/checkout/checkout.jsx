import { useContext, useState } from "react";
import Style from "./checkout.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { token, cartDetails, setcartDetails } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  async function createCashOrder(values) {
    try {
      setLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartDetails?.data?._id}`,
        method: "POST",
        headers: {
          token: token,
        },
        data: values,
      };

      const { data } = await axios.request(options);
      console.log("Cash Order Response:", data);
      setcartDetails([]);
      alert("✅ Cash order created successfully!");
    } catch (error) {
      console.error("❌ Error creating cash order:", error);
      alert("Something went wrong while creating cash order!");
    } finally {
      setLoading(false);
    }
  }

  async function createOnlineOrder(values) {
    try {
      setLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartDetails?.data?._id}?url=http://localhost:5173`,
        method: "POST",
        headers: {
          token: token,
        },
        data: values,
      };

      const { data } = await axios.request(options);
      console.log("Online Order Response:", data);

      if (data.status === "success") {
        window.location.href = data.session.url;
      }
    } catch (error) {
      console.error("❌ Error creating online order:", error);
      alert("Something went wrong while creating online order!");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Yup validation schema
  let YupValidation = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      city: Yup.string().required("City is required").min(2, "Too short"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^01[0125][0-9]{8}$/i, "Must be a valid Egyptian number"),
      details: Yup.string()
        .required("Details are required")
        .min(5, "Too short"),
    }),
  });

  // ✅ Formik setup
  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema: YupValidation,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-5">Shipping Address</h2>

      <form onSubmit={formik.handleSubmit}>
        {/* City */}
        <input
          type="text"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="City"
          className="mb-4 w-full p-2 border border-gray-400"
        />
        {formik.touched.shippingAddress?.city &&
          formik.errors.shippingAddress?.city && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.shippingAddress.city}
            </div>
          )}

        {/* Phone */}
        <input
          type="tel"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Phone"
          className="mb-4 w-full p-2 border border-gray-400"
        />
        {formik.touched.shippingAddress?.phone &&
          formik.errors.shippingAddress?.phone && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.shippingAddress.phone}
            </div>
          )}

        {/* Details */}
        <textarea
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Details"
          className="border p-2 border-gray-400 w-full mb-4"
        ></textarea>
        {formik.touched.shippingAddress?.details &&
          formik.errors.shippingAddress?.details && (
            <div className="text-red-500 text-sm mb-2">
              {formik.errors.shippingAddress.details}
            </div>
          )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => createCashOrder(formik.values)}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Processing..." : "Cash order"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => createOnlineOrder(formik.values)}
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Processing..." : "Online order"}
          </button>
        </div>
      </form>
    </>
  );
}
