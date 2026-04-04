import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <main className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-24 mb-12 py-10 bg-white rounded-2xl">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
