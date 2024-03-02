import Filters from "../Components/Filters";
import Wrapper from "../Components/Wapper";
import ProductCard from "../Components/ProductCard";
import BannerClub from "../Components/BannerClub";

import prod from "../assets/products.json";
import "../../public/otherImages/Blue and Yellow Modern Artisan Parties and Celebrations X-Frame Banner.gif";
import { Product } from "../@types";

function Shop() {
  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <div
        className="mb-12"
        style={{
          height: "13vw",
          width: "100%",
          background:
            'url("../../public/otherImages/Blue and Yellow Modern Artisan Parties and Celebrations X-Frame Banner.gif")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
        }}
      ></div>
      <Filters />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {prod.products?.map((p:Product) => {
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
