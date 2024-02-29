import '../../public/productImg/elevatex-pro/elevatex_pro_1.jpg'

interface CarousselProps {
    images: string[]
}

//! modifier plus tard
function Caroussel() {
  return (
    <div className="bg-black h-screen w-full">
      <div
        className="image-container w-full h-full"
      ></div>
    </div>
  );
}

export default Caroussel;
