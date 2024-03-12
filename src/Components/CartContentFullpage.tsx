import { Button, Image } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { findItem } from "../hooks/findItem";
import { getTotal } from "../hooks/getTotal";
import { Link } from "react-router-dom";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { removeFromCart } from "../store/reducers/cartReducer";

function CartContentFullpage() {
  const dispatch = useAppDispatch();
  const { content } = useAppSelector((state) => state.cart);
  const { list } = useAppSelector((state) => state.products);

  return (
    <div className="px-1 py-2 flex flex-col gap-2 w-full">
      <ul>
        {content.map((e, index) => {
          const item = findItem(list, "slug", e?.model);

          return (
            <Link key={item.slug + e?.size + index} to={`/shop/${item.slug}`}>
              <li className="flex gap-2 border-b mb-2 pb-1">
                <Image
                  src={`/productImg/${item.slug}/${item.images[0]}`}
                  radius="none"
                  className="w-24 bg-slate-500"
                ></Image>
                <div className="text-start w-full">
                  <div className="grid grid-cols-2">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-end">{item.price}€</p>
                  </div>
                  <p className="text-tiny">Pointure : {e?.size}</p>
                  <div className="flex">
                    <Button
                      variant="light"
                      radius="full"
                      isIconOnly
                      className="text-tiny"
                      size="sm"
                    >
                      <HeartIcon className="w-4" />
                    </Button>

                    <Button
                      variant="light"
                      radius="full"
                      isIconOnly
                      className="text-tiny"
                      size="sm"
                      onClick={(ev) => {
                        ev.preventDefault();
                        if (e !== null) {
                          dispatch(removeFromCart(index));
                        }
                      }}
                    >
                      <TrashIcon className="w-4" />
                    </Button>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>

      <div className="grid grid-cols-2">
        <span className="text-start">Sous-total</span>
        <span className="text-end">{getTotal(content)}€</span>
      </div>
    </div>
  );
}

export default CartContentFullpage;
