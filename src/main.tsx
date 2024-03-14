import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import App from "./App.tsx";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Cart from "./Pages/Cart.js";
import Order from "./Pages/Order.js";
import Checkout from "./Pages/Checkout.tsx";
import ThankYou from "./Pages/ThankYou.jsx";
import Account from "./Pages/Account.jsx";

import store from "./store/index.ts";

import "./index.scss";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:slug" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/cart/pass-your-order" element={<Order />} />
      <Route path="/cart/checkout" element={<Checkout />} />
      <Route path="/cart/pass-your-order/success" element={<ThankYou />} />
      <Route path="/account" element={<Account />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </Provider>
  // </React.StrictMode>
);
