import { Button, Link } from "@nextui-org/react";
import CartContent from "./CartContent";

function PopoverCart() {
  return (
    <>
      <CartContent />
      <Button
        as={Link}
        color="default"
        href="/cart"
        variant="flat"
        size="sm"
        className="bg-slate-900 text-slate-50 w-full rounded"
      >
        Voir mon panier
      </Button>
    </>
  );
}

export default PopoverCart;
