import { Product } from "../@types";
import ProductCard from "./ProductCard";

function ProductCaroussel({ arr, length }: { arr: Product[]; length: number }) {
  const width = length * 300;
  return (
    <div className="home-product-caroussel w-inherit mb-12 py-4 overflow-x-scroll">
      <div className={`w-[${width}px] flex flex-row gap-2`}>
        {arr.map((e: Product) => {
          return (
            <ProductCard
              key={e.slug}
              title={e.title}
              price={e.price}
              slug={e.slug}
              likes={e.likes}
              images={e.images}
              size-range={e["size-range"]}
              size-available={e["size-available"]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductCaroussel;
