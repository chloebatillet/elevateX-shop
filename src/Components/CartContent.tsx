import { Image } from "@nextui-org/react";
import { useAppSelector } from "../hooks/redux";
import { findItem } from "../hooks/findItem";
import { getTotal } from "../hooks/getTotal";

function CartContent() {
  const { content } = useAppSelector((state) => state.cart);
  const { list } = useAppSelector((state) => state.products);
  

  return (
    <div className="px-1 py-2 flex flex-col gap-2 w-full">
      <ul>
        {content.map((e, index) => {
          const item = findItem(list, "slug", e?.model);

          return (
            <li
              key={item.slug + e?.size + index}
              className="flex gap-2 border-b mb-2 pb-1"
            >
              <Image
                src={`/productImg/${item.slug}/${item.images[0]}`}
                radius="none"
                className="w-12 bg-slate-500"
              ></Image>
              <div className="text-start w-full">
                <p className="text-small font-semibold">{item.title}</p>
                <div className="grid grid-cols-2">
                  <p className="text-tiny">{e?.size}</p>
                  <p className="text-tiny text-end">{item.price}€</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="grid grid-cols-2">
        <span>Total</span>
        <span className="text-end">{getTotal(content)}€</span>
      </div>
      
    </div>
  );
}

export default CartContent;
