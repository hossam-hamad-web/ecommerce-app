import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { getLoggedUserCart, cartDetails } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userLogin) {
      getLoggedUserCart();
    }
  }, [userLogin]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-100 z-50 static lg:fixed top-0 right-0 left-0 mb-10">
      <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row justify-between items-center">
        {/* Logo + Hamburger */}
        <div className="w-full lg:w-auto flex justify-between items-center">
          <img width={80} src={logo} alt="Fresh Cart Logo" />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-slate-900"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Left Links */}
        {userLogin && (
          <ul
            className={`${
              isOpen ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row items-center gap-4 mt-4 lg:mt-0`}
          >
            <li>
              <NavLink onClick={closeMenu} to="" className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="products" className="nav-link">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="cart" className="nav-link">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="brands" className="nav-link">
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="categories" className="nav-link">
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="allorders" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        )}

        {/* Right Side */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-4 mt-4 lg:mt-0`}
        >
          {!userLogin && (
            <>
              <li>
                <NavLink onClick={closeMenu} to="login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink onClick={closeMenu} to="register" className="nav-link">
                  Register
                </NavLink>
              </li>
            </>
          )}

          {userLogin && (
            <li className="relative">
              <i className="fa-solid fa-cart-shopping text-2xl text-slate-900">
                <span className="absolute -top-3 -right-3 bg-green-700 text-white text-xs font-bold rounded-full px-2">
                  {cartDetails?.products?.length || 0}
                </span>
              </i>
            </li>
          )}

          {/* Social Icons */}
          <li className="flex gap-3 text-xl text-slate-900">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-youtube"></i>
          </li>

          {userLogin && (
            <li>
              <NavLink
                to="login"
                onClick={() => {
                  setuserLogin(null);
                  localStorage.removeItem("userToken");
                  closeMenu();
                }}
                className="nav-link"
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
