import { useState } from "react";

import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Link as NextLink,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

import CartContentFullpage from "../Components/CartContentFullpage";
import Wrapper from "../Components/Wapper";
import PayementMethods from "../Components/PaymentMethods";

import { getSubtotal } from "../hooks/getSubtotal";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { submitCode } from "../store/reducers/cartReducer";
import { validateCart } from "../store/reducers/orderReducer";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useAppDispatch();
  const { content, promoMessage, reduction } = useAppSelector(
    (state) => state.cart
  );

  const freeDeliveryPrice = 300;
  const subTotal = getSubtotal(content);

  const deliveryOptionsList = [
    {
      value: "magasin",
      name: "En magasin",
      price: subTotal! > freeDeliveryPrice ? 0 : 0,
    },
    {
      value: "point-relais",
      name: "En point relais",
      price: subTotal! > freeDeliveryPrice ? 0 : 3.25,
    },
    {
      value: "domicile",
      name: "A votre domicile",
      price: subTotal! > freeDeliveryPrice ? 0 : 4.95,
    },
  ];

  const [deliveryOption, setDeliveryOption] = useState(
    deliveryOptionsList[0].value
  );

  const total =
    subTotal! > freeDeliveryPrice
      ? getSubtotal(content)! - reduction
      : getSubtotal(content)! -
        reduction +
        deliveryOptionsList.find((e) => e.value === deliveryOption)!.price;

  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <h1 className="uppercase font-bold text-start ml-1 text-2xl">
        Mon panier{" "}
        <span className="font-normal">
          (
          {content.length > 1
            ? content.length + " articles"
            : content.length + " article"}
          )
        </span>
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {content.length > 0 ? (
          <div>
            <CartContentFullpage />
            <Button
              as={NextLink}
              color="default"
              href="/cart/pass-your-order"
              variant="flat"
              size="sm"
              className="bg-slate-900 text-slate-50 w-full rounded"
              onClick={() => {
                if (content.length > 0) {
                  dispatch(
                    validateCart({
                      subTotal: subTotal,
                      reduction: reduction,
                      total: total,
                      deliveryOption: deliveryOption,
                    })
                  );
                }
              }}
              onSubmit={() => {
                if (content.length > 0) {
                  dispatch(
                    validateCart({
                      subTotal: subTotal,
                      reduction: reduction,
                      total: total,
                      deliveryOption: deliveryOption,
                    })
                  );
                }
              }}
            >
              Finaliser mon achat
            </Button>
          </div>
        ) : (
          <div className="flex flex-col mt-16 mx-2 text-xl text-start">
            <p className="">Votre panier est vide</p>
            <Link to="/shop" className="text-lg text-slate-500 underline">
              Commencer vos achats
            </Link>
          </div>
        )}

        <div className="text-slate-900 text-start">
          <Accordion defaultExpandedKeys={["2"]} isCompact={false}>
            <AccordionItem
              key="1"
              aria-label="code-promo"
              title="Ajouter un code promo"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Voir ensuite pour de vrais codes
                  dispatch(submitCode(""));
                }}
              >
                <Input
                  isClearable
                  size="sm"
                  type="text"
                  variant="flat"
                  placeholder="Entrer le code"
                  className="max-w-xs"
                />
                <p className="text-sm text-green-500 mt-1">{promoMessage}</p>
              </form>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="delivery-options"
              title="Options de livraison"
            >
              <RadioGroup
                // label="Selectionner un mode de livraison"
                value={deliveryOption}
                onValueChange={setDeliveryOption}
                color="default"
              >
                {deliveryOptionsList.map((e) => {
                  return (
                    <Radio
                      key={e.value}
                      value={e.value}
                      description={
                        subTotal! > freeDeliveryPrice
                          ? "gratuit"
                          : `${e.price}€`
                      }
                    >
                      {e.name}
                    </Radio>
                  );
                })}
              </RadioGroup>
            </AccordionItem>
          </Accordion>
          <div className="px-2">
            <Divider className="my-2" />
            <h2 className="text-lg">Récapitulatif</h2>
            <div className="flex flex-col">
              <div className="flex justify-between text-sm text-slate-400">
                <p>
                  {content.length > 1
                    ? content.length + " articles"
                    : content.length + " article"}
                </p>
                <p>{subTotal}€</p>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <p>Livraison</p>
                <p>
                  {subTotal! > freeDeliveryPrice
                    ? "gratuit"
                    : deliveryOptionsList.find(
                        (e) => e.value === deliveryOption
                      )!.price + "€"}
                </p>
              </div>
              {reduction > 0 && (
                <div className="flex justify-between text-sm text-slate-400">
                  <p>Réduction</p>
                  <p>-{reduction}€</p>
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <p>Total TTC</p>
              <p className="text-end">{total}€</p>
            </div>
          </div>

          <PayementMethods />
        </div>
      </section>
    </Wrapper>
  );
}

export default Cart;
