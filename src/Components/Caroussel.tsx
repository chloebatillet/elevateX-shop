import "../../public/otherImages/hero-homepage.mp4";


//! modifier plus tard
function Caroussel() {
  return (
    <div className="bg-black w-full text-white">
      <video autoPlay muted loop className="w-screen">
        <source
          src="../../public/otherImages/hero-homepage.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Caroussel;
