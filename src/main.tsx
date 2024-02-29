import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.tsx";
import "./index.css";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import Basket from "./Pages/Basket.jsx";
import Checkout from "./Pages/Checkout.jsx";
import ThankYou from "./Pages/ThankYou.jsx";
import Account from "./Pages/Account.jsx";

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
      <Route path="/cart" element={<Basket />} />
      <Route path="/cart/pass-your-order" element={<Checkout />} />
      <Route path="/cart/pass-your-order/success" element={<ThankYou />} />
      <Route path="/account" element={<Account />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  // </React.StrictMode>
);
