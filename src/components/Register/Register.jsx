import { useContext, useEffect, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; // ✅ استيراد yup
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate(); // programmatic navigate
  const [apiError, setapiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleRegister(formValues) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse.data.message == "success") {
          localStorage.setItem("userToken", apiResponse.data.token);
          //
          setuserLogin(apiResponse.data.token);
          navigate("/"); // too go to index (Home)
        }
        setisLoading(false);
        setapiError(apiResponse?.response?.data.message);
      }) // seccessفي حالة ال respone بيتبعتلها اللي
      .catch((apiResponse) => {
        setapiError(apiResponse?.response?.data?.message);
        setisLoading(false);
        // console.log(apiResponse?.response?.data?.message)
      }); // reject حالة ال respone بيتبعتلها اللي

    // console.log(data)
    // if (data.message == 'success') {
    // }
    // console.log(formValues);
  }
  /* this object that will be send to back-end
     and those inforamation is required in 
     database not from your brain */
  /*let us to make validation using Yup */

  let YupValidation = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .matches(/^[A-Z][a-z]{3,5}$/gi, " Name must start with upercase")
      .min(3, "name minLength is 3")
      .max(10, "nam maxLength is 10"),

    email: Yup.string().required("Email is required").email("Invalid Email"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/gi, "Phone numbe must be egyptian"),

    password: Yup.string()
      .required("Passowrd is required")
      .min(6, "Password must be at least 6 character")
      .matches(/^[A-Z][a-z0-9]{5,10}/, "password must start with uppercase "),

    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  // بالجافاسكريبت بس  validation ده كده ال
  // function myValidation(formValues) {
  //     let errors = {};

  //     if (!formValues.name) {
  //         errors.name = "Name is Required";
  //     }
  //     else if (!/^[A-Z][a-z]{3,5}$/ig.test(formValues.name)) {
  //         errors.name = "Name must start with upercase";
  //     }

  //     if (!formValues.email) {
  //         errors.email = "Email is Required";
  //     }
  //     else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formValues.email)) {
  //         errors.email = "Email invalid";
  //     }

  //     return errors;
  //     // formik في error اللي بيرجع من هنا بيتحط في حاجه اسمها
  // }
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: YupValidation,
    // validate: myValidation,
    onSubmit: handleRegister,
  });
  // اللي هيبعت للداتا بيز objectيعني من الاخر ده

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}

        <h2 className="text-3xl text-green-600 font-bold mb-6"> Rgister Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="name"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Name
            </label>
          </div>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="phone"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter phone number
            </label>
          </div>

          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="email"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Email
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="password"
              className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter password
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            />
            <label
              htmlFor="rePassword"
              className="py-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              rePassword
            </label>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>
          <p>
            If you hava an account ?{" "}
            <span className="py-1 font-bold text-pink-800">
              {" "}
              <Link to={"/login"}> Login Now</Link>{" "}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
