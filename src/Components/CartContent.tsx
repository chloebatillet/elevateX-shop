import { useAppSelector } from "../hooks/redux";
import { getSubtotal } from "../hooks/getSubtotal";
import CartContentLines from "./CartContentLines";

function CartContent() {
  const { content } = useAppSelector((state) => state.order.currentOrder);

  return (
    <div className="px-1 py-2 flex flex-col gap-2 w-full">
      <CartContentLines />

      <div className="grid grid-cols-2">
        <span>Total</span>
        <span className="text-end">{getSubtotal(content)}€</span>
      </div>
    </div>
  );
}

export default CartContent;
