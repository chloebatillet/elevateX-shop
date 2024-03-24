import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer/Footer.js";
import { Analytics } from "@vercel/analytics/react";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
