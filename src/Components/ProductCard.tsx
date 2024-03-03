import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../@types";


function ProductCard({
  title,
  price,
  slug,
  likes,
  images,
  "size-range": sizeRange,
  "size-available": sizeAvailable,
}: ProductCardProps) {
  return (
    <Link to={`/shop/${slug}`} className="product-card">
      <div className="relative overflow-hidden">
        <Image
          radius="none"
          isZoomed
          src={`/productImg/${slug}/${images[0]}`}
        />

        <div className="grid grid-cols-10 product-card-sizes absolute bg-slate-50/[.7] w-full text-start -bottom-6 transition-all z-10">
          {sizeRange.map((e, index) => {
            let found = sizeAvailable.includes(e);

            return (
              <div
                key={e + index}
                className={found ? "text-center" : "text-center text-slate-400"}
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 ml-2 mt-1">
        {likes > 2000 && (
          <p className="text-violet-500 text-start">TENDANCE</p>
        )}
        <h3 className="text-start font-bold">{title}</h3>
        <p className="text-slate-500 text-start">{price}€</p>
      </div>
    </Link>
  );
}

export default ProductCard;
