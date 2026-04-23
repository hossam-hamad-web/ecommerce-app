import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { motion } from "framer-motion"; // استيراد مكتبة الأنيميشن

export default function Login() {
  let { setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleLogin(formValues) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse.data.message === "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          setuserLogin(apiResponse.data.token);
          navigate("/");
        }
        setisLoading(false);
      })
      .catch((err) => {
        setapiError(
          err?.response?.data?.message || "Invalid email or password",
        );
        setisLoading(false);
      });
  }

  let YupValidation = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string().required("Password is required"),
  });

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: YupValidation,
    onSubmit: handleLogin,
  });

  return (
    <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#f8fafc] overflow-hidden">
      {/* عناصر متحركة في الخلفية لتصميم عصري */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7 }}
            className="bg-green-600 p-4 rounded-3xl shadow-2xl shadow-green-200"
          >
            <i className="fas fa-shopping-bag text-white text-3xl"></i>
          </motion.div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          The best deals are waiting for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-[2.5rem] sm:px-12 border border-white">
          {apiError && (
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl text-sm flex items-center gap-3"
            >
              <i className="fas fa-exclamation-triangle"></i>
              {apiError}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="example@mail.com"
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none shadow-sm"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-2 text-xs text-red-500 font-medium ml-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-bold text-gray-700">
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none shadow-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-green-200 text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 font-extrabold hover:underline underline-offset-4 transition-all"
              >
                Sign Up Free
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
