import style from "./Footer.module.css";
import pay1 from "../../assets/PaymentsImgs/visa.png";
import pay2 from "../../assets/PaymentsImgs/paypal.png";
import pay3 from "../../assets/PaymentsImgs/master_card.png";
import pay4 from "../../assets/PaymentsImgs/carte_bleue.png";
import pay5 from "../../assets/PaymentsImgs/american_express.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={`bg-[#FAFAFA] mt-4 px-4 py-8 ${style.footer}`}>
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mx-auto w-full md:w-4/5 border-b border-gray-300 pb-4">
        <div className="group flex flex-col items-center font-semibold">
          <i className="my-1 group-hover:text-green-400 text-5xl group-hover:-translate-y-1 duration-200 fa-solid fa-truck-fast"></i>
          <p className={`${style.iconName} my-1`}>Free Shipping</p>
          <p className={`${style.desc} my-1`}>For all Orders Over $100</p>
        </div>
        <div className="group flex flex-col items-center font-semibold">
          <i className="my-1 group-hover:text-green-400 text-5xl fa-rotate-left group-hover:-translate-y-1 duration-200 fa-solid"></i>
          <p className={`${style.iconName} my-1`}>30 Days Returns</p>
          <p className={`${style.desc} my-1`}>For an Exchange Product</p>
        </div>
        <div className="group flex flex-col items-center font-semibold">
          <i className="my-1 group-hover:text-green-400 text-5xl group-hover:-translate-y-1 duration-200 fa-solid fa-credit-card"></i>
          <p className={`${style.iconName} my-1`}>Secured Payment</p>
          <p className={`${style.desc} my-1`}>Payment Cards Accepted</p>
        </div>
        <div className="group flex flex-col items-center font-semibold">
          <i className="my-1 group-hover:text-green-400 text-5xl group-hover:-translate-y-1 duration-200 fa-solid fa-headphones"></i>
          <p className={`${style.iconName} my-1`}>Support 24/7</p>
          <p className={`${style.desc} my-1`}>Contact us Anytime</p>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mx-auto w-full md:w-4/5 border-b border-gray-300 py-4">
        {/* Contact */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <p className={`my-2 font-bold ${style.contact}`}>Contact us</p>
          <p className={`my-1 font-medium ${style.desc}`}>
            Shoplet – Everything You Need, All in One Place
          </p>
          <p
            className={`font-medium text-[#616161] hover:text-green-400 ${style.gmail}`}
          >
            Shoplet@gmail.com
          </p>
          <p className={`font-semibold text-green-400 my-2 ${style.phoneNum}`}>
            {" "}
            (+20) 01119121377{" "}
          </p>
          <div className="flex flex-row items-center gap-2">
            <i className="text-green-400 text-4xl fa-solid fa-message"></i>
            <div className="flex flex-col justify-center gap-1">
              <p className="font-medium">Online Chat</p>
              <p className="font-medium">Get Expert Help</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-1 w-full md:w-1/6">
          <p className={`my-2 font-bold ${style.contact}`}>Products</p>
          {[
            "Prices drop",
            "New products",
            "Best sales",
            "Contact us",
            "Sitemap",
            "Stores",
          ].map((item, idx) => (
            <p
              key={idx}
              className="font-medium hover:text-green-400 duration-200"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Our company */}
        <div className="flex flex-col gap-1 w-full md:w-1/6">
          <p className={`my-2 font-bold ${style.contact}`}>Our company</p>
          {["Delivery", "Legal Notice", "Terms and conditions of use"].map(
            (item, idx) => (
              <p
                key={idx}
                className="font-medium hover:text-green-400 duration-200"
              >
                {item}
              </p>
            ),
          )}
          <Link
            to="/about"
            className="font-medium hover:text-green-400 duration-200"
          >
            About us
          </Link>
          {["Secure payment", "Login"].map((item, idx) => (
            <p
              key={idx}
              className="font-medium hover:text-green-400 duration-200"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <p className={`my-2 font-bold ${style.contact}`}>
            Subscribe to newsletter
          </p>
          <p className={`mt-1 mb-3 font-medium ${style.desc} text-gray-800`}>
            Subscribe to our latest newsletter to get news about special
            discounts.
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 mx-auto w-full md:w-4/5">
        <div className="flex flex-row gap-3 text-2xl md:text-3xl">
          {[
            "fa-facebook-f",
            "fa-youtube",
            "fa-pinterest-p",
            "fa-instagram",
          ].map((icon, idx) => (
            <i
              key={idx}
              className={`hover:bg-green-400 p-2 border border-gray-300 rounded-full w-10 h-10 hover:text-white text-center duration-300 fab ${icon}`}
            ></i>
          ))}
        </div>
        <p
          className={`${style.ecommerce} font-medium text-center md:text-left`}
        >
          © {new Date().getFullYear()} - Ecommerce Shoplet
        </p>
        <div className="flex flex-row items-center gap-2">
          {[pay1, pay2, pay3, pay4, pay5].map((img, idx) => (
            <img key={idx} className="w-10 md:w-16" src={img} alt="payment" />
          ))}
        </div>
      </div>
    </footer>
  );
}
