import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <div>footer</div>
    </>
  );
}

export default App;
