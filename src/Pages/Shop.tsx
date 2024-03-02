import Filters from "../Components/Filters";
import Wrapper from "../Components/Wapper";
import ProductCard from "../Components/ProductCard";
import BannerClub from "../Components/BannerClub";

import { Product } from "../@types";
import { useAppSelector } from "../hooks/redux";

function Shop() {
  const productList = useAppSelector((state) => state.products.filteredList);

  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <div
        className="mb-12"
        style={{
          height: "13vw",
          width: "100%",
          background:
            'url("/otherImages/Blue and Yellow Modern Artisan Parties and Celebrations X-Frame Banner.gif")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
        }}
      ></div>
      <Filters />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {productList?.map((p: Product) => {
          return <ProductCard key={p.title} {...p} />;
        })}
      </div>
      <div className="py-12">
        <BannerClub />
      </div>
    </Wrapper>
  );
}

export default Shop;

