import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { motion } from "framer-motion"; // مكتبة الأنيميشن

export default function Register() {
  let { setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleRegister(formValues) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setuserLogin(apiResponse.data.token);
          navigate("/");
        }
        setisLoading(false);
      })
      .catch((err) => {
        setapiError(err?.response?.data?.message || "Registration failed");
        setisLoading(false);
      });
  }

  let YupValidation = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Too short")
      .max(10, "Too long"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Must be an Egyptian number"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "At least 6 characters")
      .matches(/^[A-Z]/, "Must start with an uppercase letter"),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: YupValidation,
    onSubmit: handleRegister,
  });

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f8fafc] overflow-hidden">
      {/* Background Shapes for modern look */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-10 -right-10 w-80 h-80 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 -left-10 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Join our community and start shopping.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4"
      >
        <div className="bg-white/90 backdrop-blur-md py-10 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[2rem] sm:px-12 border border-white">
          {apiError && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="mb-5 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2"
            >
              <i className="fas fa-exclamation-circle"></i> {apiError}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Grid Layout for compact look */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm"
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="mt-1 text-[10px] text-red-500 ml-1 font-bold italic">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  placeholder="01xxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="mt-1 text-[10px] text-red-500 ml-1 font-bold italic">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-1 text-[10px] text-red-500 ml-1 font-bold italic">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 text-[10px] text-red-500 ml-1 font-bold italic">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 ml-1 uppercase">
                  Confirm
                </label>
                <input
                  name="rePassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-green-500 transition-all outline-none text-sm"
                />
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <p className="mt-1 text-[10px] text-red-500 ml-1 font-bold italic">
                    {formik.errors.rePassword}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-70 mt-6"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-extrabold text-green-600 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
