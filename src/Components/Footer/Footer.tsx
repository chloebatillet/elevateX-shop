import logo from "../../../public/Noir_et_Blanc_Encadré_Future_DJ_Logo-removebg-preview.png";
import About from "./About";
import Cities from "./Cities";
import Contact from "./Contact";

function Footer() {
  return (
    //? Beau ou moche ?
    // bg-gradient-to-t from-[rgba(177,148,233,0.64)] h-[100px] w-[100%] to-transparent
    <footer className="bg-black grid grid-col-1 justify-center mt-12">
      <div className=" text-slate-50 flex flex-wrap sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-4 py-6 px-6 sm:pr-6 h-max max-w-[1000px]">
        <div
          className="flex flex-col items-center justify-center w-0
      sm:w-full"
        >
          <img src={logo} className="w-1/4"></img>
        </div>
        <div className="flex flex-col  w-1/2 sm:w-full sm:items-start">
          <About />
        </div>
        <div className="flex flex-col sm:items-center lg:items-start  w-1/2 sm:w-full">
          <Cities />
        </div>
        <div className="flex flex-col mt-6 sm:mt-0 sm:items-center w-full sm:w-full">
          <Contact />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
