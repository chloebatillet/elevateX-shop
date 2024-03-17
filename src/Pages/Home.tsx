import { Divider } from "@nextui-org/react";
import BannerClub from "../Components/BannerClub";
import Caroussel from "../Components/Caroussel";
import TrustBanner from "../Components/TrustBanner";
import Wrapper from "../Components/Wapper";
import { useAppSelector } from "../hooks/redux";
import ProductCaroussel from "../Components/ProductCaroussel";

function Home() {
  const { list } = useAppSelector((state) => state.products);
  const popularArr = [...list].sort((a, b) => b.likes - a.likes).slice(0, 6);

  return (
    <>
      <Caroussel />
      <Wrapper>
        <h2 className="text-start ml-4 font-bold text-2xl mt-12">
          Collections
        </h2>
        <Divider className="my-2"></Divider>
        <div className="grid grid-cols-4 overflow-hidden mb-12 py-4"></div>

        <h2 className="text-start ml-4 font-bold text-2xl">
          Dernière chance
        </h2>
        <Divider className="my-2"></Divider>
        <ProductCaroussel arr={popularArr} length={popularArr.length} />

        <BannerClub />

        <h2 className="text-start ml-4 font-bold text-2xl">
          Populaires en ce moment
        </h2>
        <Divider className="my-2"></Divider>
        <ProductCaroussel arr={popularArr} length={popularArr.length} />
      </Wrapper>
      <TrustBanner />
    </>
  );
}

export default Home;
