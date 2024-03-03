import Filters from "../Components/Filters";
import Wrapper from "../Components/Wapper";
import ProductCard from "../Components/ProductCard";
import BannerClub from "../Components/BannerClub";

import { Product } from "../@types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { reset } from "../store/reducers/productsReducer";
import { Button } from "@nextui-org/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Shop() {
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.products.filteredList);
  const { isFiltered } = useAppSelector((state) => state.products);

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

      <>
        {isFiltered ? (
          <div className="flex justify-end mb-2">
            <Button
              className="bg-slate-900 text-slate-50"
              size="sm"
              onClick={() => dispatch(reset())}
              startContent={<XMarkIcon className="w-4 h-4" />}
            >
              Supprimer les filtres
            </Button>
          </div>
        ) : null}
      </>

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
