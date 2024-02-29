import Caroussel from "../Components/Caroussel";
import TrustBanner from "../Components/TrustBanner";
import Wrapper from "../Components/Wapper";

function Home() {
  return (
    <>
      <Caroussel />
      <Wrapper>
        <div>Collections</div>
        <div>Rejoins le club</div>
        <div>Populaires</div>
      </Wrapper>
      <TrustBanner />
    </>
  );
}

export default Home;
