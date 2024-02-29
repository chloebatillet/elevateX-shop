import logo from "../../../public/Noir_et_Blanc_Encadré_Future_DJ_Logo-removebg-preview.png";
import About from "./About";
import Cities from "./Cities";
import Contact from "./Contact";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[rgba(177,148,233,0.64)] h-[100px] w-[100%] to-transparent grid sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 mt-12 py-6 pr-6 h-max">
      <div className="flex flex-col items-center justify-center sm:full">
        <img src={logo} className="w-1/4"></img>
        <p className="text-xl">ElevateX</p>
      </div>
      <div className="flex flex-col items-center sm:w-full sm:items-start">
        <About />
      </div>
      <div className="flex flex-col sm:items-center md:items-start sm:w-full">
        <Cities />
      </div>
      <div className="flex flex-col items-center sm:w-full">
        <Contact />
      </div>
    </footer>
  );
}

export default Footer;
