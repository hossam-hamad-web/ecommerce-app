import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AllOrders from "./components/AllOrders/AllOrders";
import Offline from "./components/offline/offline.jsx";
import Checkout from "./components/checkout/checkout.jsx";
/**
 *   هي اللي بتتحكم في كل الريكوستات بتاعتيfunction QueyClient ال
 *  */
let query = new QueryClient({
  defaultOptions: {
    /* appاللي هتشتغل علي ال configrationبنحط كل ال */
  },
});

let route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "allorders", element: <AllOrders /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            {" "}
            <Checkout />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={route}></RouterProvider>
            <ReactQueryDevtools initialIsOpen="false" />
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>

      <Offline>
        <div className="fixed bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg">
          Check Your Internet Conection
        </div>
      </Offline>

      {/* /**QueryClientProvider كده انا بقول للابلكيشن هيجيلك داتاا عن طريق   */}
    </>
  );
}

export default App;
