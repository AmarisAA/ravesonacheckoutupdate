import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home/Home";
import Category from "./Pages/Categories/Categories";
import Product from "./Pages/Products/Product";
import CheckoutInfo from "./Pages/CheckoutInfo/CheckoutInfo";
import Payment from "./Pages/CheckoutPayment/Payment";
import About from "./Pages/About/About";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MyCart from "./Pages/My_cart/MyCart";
import Wishlist from "./Pages/Wishlist/Wishlist";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  const Layout = () => {
    return (
      <>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories/:id",
          element: <Category />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/mycart",
          element: <MyCart />,
        },
        {
          path: "/checkout/information",
          element: <CheckoutInfo />,
        },
        {
          path: "/checkout/payment",
          element: <Payment />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}

export default App;