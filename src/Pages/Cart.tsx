import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Input,
  Link,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import CartContent from "../Components/CartContent";
import Wrapper from "../Components/Wapper";
import { getTotal } from "../hooks/getTotal";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useState } from "react";
import { submitCode } from "../store/reducers/cartReducer";

const deliveryOptionsList = [
  { value: "magasin", name: "En magasin", price: 0 },
  { value: "point-relais", name: "En point relais", price: 3.25 },
  { value: "domicile", name: "A votre domicile", price: 4.95 },
];

function Cart() {
  const dispatch = useAppDispatch();
  const { content, promoMessage, reduction } = useAppSelector(
    (state) => state.cart
  );
  const totalAmount = getTotal(content);
  const [deliveryOption, setDeliveryOption] = useState(
    deliveryOptionsList[0].value
  );
  const freeDeliveryPrice = 300;
  // const promo = 0;

  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <h1 className="uppercase font-bold text-start ml-1 text-xl">
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
        <div>
          <CartContent />
          <Button
            as={Link}
            color="default"
            href="/cart"
            variant="flat"
            size="sm"
            className="bg-slate-900 text-slate-50 w-full rounded"
          >
            Finaliser mon achat
          </Button>
        </div>

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
                        totalAmount! > freeDeliveryPrice
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
                <p>{totalAmount}€</p>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <p>Livraison</p>
                <p>
                  {totalAmount! > freeDeliveryPrice
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
              <p className="text-end">
                {totalAmount! > freeDeliveryPrice
                  ? getTotal(content)! - reduction
                  : getTotal(content)! -
                    reduction +
                    deliveryOptionsList.find((e) => e.value === deliveryOption)!
                      .price}
                €
              </p>
            </div>
          </div>

          <div>
            <Divider className="my-2" />
            <h2 className="text-lg">Méthodes de paiement acceptées</h2>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

export default Cart;
