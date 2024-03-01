import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  slug: string;
  collection: string;
  description: string;
  composition: string;
  entretien: string;
  likes: number;
  images: string[];
  "size-range": number[];
  "size-available": number[];
}

function ProductCard({ ...product }: Product) {
  return (
    <Link to={product.slug} className="product-card">
      <div className="relative overflow-hidden">
        <Image
          radius="none"
          isZoomed
          src={`../../public/productImg/${product.slug}/${product.images[0]}`}
        />

        <div className="grid grid-cols-10 product-card-sizes absolute bg-slate-50/[.7] w-full text-start -bottom-6 transition-all z-10">
          {product["size-range"].map((e, index) => {
            let found = product["size-available"].includes(e);

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
        {product.likes > 2000 && (
          <p className="text-violet-500 text-start">TENDANCE</p>
        )}
        <h3 className="text-start font-bold">{product.title}</h3>
        <p className="text-slate-500 text-start">{product.price}€</p>
      </div>
    </Link>
  );
}

export default ProductCard;
