import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Wrapper from "../Components/Wapper";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Button } from "@nextui-org/button";
import { Divider, Radio, RadioGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  selectDeliveryOption,
  validateOrderDetails,
} from "../store/reducers/orderReducer";
import FormContactDetails from "../Components/FormContactDetails";
import FormDeliveryDetailsHome from "../Components/FormDeliveryDetailsHome";
import { getTotal } from "../hooks/getTotal";
import FormDeliveryDetailsShop from "../Components/FormDeliveryDetailsShop";
import { getDate } from "../hooks/getDate";
import CartContentLines from "../Components/CartContentLines";
import { ContactDetails, DeliveryDetails } from "../@types";

function Checkout() {
  const dispatch = useAppDispatch();
  const [contactDetails, setContactDetails] = useState<ContactDetails>();
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>();
  const { content, subtotal, reduction, total, deliveryMode } = useAppSelector(
    (state) => state.order.currentOrder
  );
  const [totalUpdated, setTotalUpdated] = useState(total);

  const freeDeliveryPrice = 300;
  const deliveryOptionsList = [
    {
      value: "magasin",
      name: "En magasin",
      price: subtotal! > freeDeliveryPrice ? 0 : 0,
      delay: 2,
    },
    {
      value: "point-relais",
      name: "En point relais",
      price: subtotal! > freeDeliveryPrice ? 0 : 3.25,
      delay: 3,
    },
    {
      value: "domicile",
      name: "A votre domicile",
      price: subtotal! > freeDeliveryPrice ? 0 : 4.95,
      delay: 4,
    },
  ];

  const [deliveryOption, setDeliveryOption] = useState(deliveryMode);

  const today = new Date();

  const [deliveryDate, setDeliveryDate] = useState(
    getDate(
      today,
      deliveryOptionsList.find((e) => e.value === deliveryMode)!.delay
    )
  );

  useEffect(() => {
    setDeliveryDate(
      getDate(
        today,
        deliveryOptionsList.find((e) => e.value === deliveryMode)!.delay
      )
    );
  }, [deliveryMode]);

  const submitAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("coucou");

    dispatch(
      validateOrderDetails({
        contactDetails: contactDetails,
        deliveryDetails: deliveryDetails,
      })
    );
  };

  useEffect(() => {
    console.log(contactDetails);
  }, [contactDetails, deliveryDetails]);

  return (
    <Wrapper marginTop="150px" marginBottom="50px">
      <h1 className="text-3xl font-bold uppercase text-start px-2 mb-8">
        Passer commande
      </h1>
      <div
        id="order-details-form"
        className="flex flex-col-reverse md:flex-row gap-4"
      >
        {/* Forms  */}
        <div className="w-full md:w-2/3">
          <Accordion defaultExpandedKeys={["1", "2"]}>
            <AccordionItem
              title="Coordonnées"
              key="1"
              aria-label="contact-details"
              classNames={{ title: "font-bold uppercase text-xl" }}
            >
              <FormContactDetails setContactDetails={setContactDetails} />
            </AccordionItem>
            <AccordionItem
              title="Options de livraison"
              key="2"
              aria-label="options-delivery"
              classNames={{
                title: "font-bold uppercase text-xl",
                content: "grid gap-8",
              }}
            >
              <RadioGroup
                value={deliveryOption}
                onValueChange={setDeliveryOption}
                name="deliveryMode"
                color="default"
                className="text-start"
              >
                {deliveryOptionsList.map((e) => {
                  return (
                    <Radio
                      key={e.value}
                      value={e.value}
                      onChange={() => {
                        const newTotal = getTotal(subtotal, reduction, e.price);
                        setTotalUpdated(newTotal);
                        dispatch(
                          selectDeliveryOption({
                            deliveryOption: e.value,
                            totalUpdated: newTotal,
                          })
                        );
                      }}
                      classNames={{
                        base: "max-w-full",
                        labelWrapper: "w-full",
                      }}
                      description={`${e.delay} jours`}
                    >
                      <p className="grid grid-cols-2">
                        <span>{e.name}</span>
                        <span className="text-end">{e.price}€</span>
                      </p>
                    </Radio>
                  );
                })}
              </RadioGroup>

              {deliveryOption === "magasin" && (
                <FormDeliveryDetailsShop
                  setDeliveryDetails={setDeliveryDetails}
                />
              )}
              {deliveryOption === "point-relais" && (
                <p className="text-red-500 text-start">
                  Service Point-relais momentanément indisponible
                </p>
              )}
              {deliveryOption === "domicile" && (
                <FormDeliveryDetailsHome
                  setDeliveryDetails={setDeliveryDetails}
                />
              )}
            </AccordionItem>
          </Accordion>
          <Button
            radius="sm"
            className="bg-slate-900 text-slate-50 w-full mt-8"
            type="submit"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              submitAll(e)
            }
          >
            Payer <span className="font-bold">{totalUpdated}€</span>
          </Button>
        </div>

        {/* Récap */}
        <div className="w-full md:w-1/3 px-2">
          <h2 className="font-bold text-xl uppercase text-start">
            Récapitulatif
          </h2>
          <div className="flex flex-col">
            <div className="flex justify-between text-sm text-slate-400">
              <p>
                {content.length > 1
                  ? content.length + " articles"
                  : content.length + " article"}
              </p>
              <p>{subtotal}€</p>
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <p>
                Livraison <span>({deliveryMode})</span>
              </p>
              <p>
                {subtotal! > freeDeliveryPrice
                  ? "gratuit"
                  : deliveryOptionsList.find((e) => e.value === deliveryMode)!
                      .price + "€"}
              </p>
            </div>
            {reduction > 0 && (
              <div className="flex justify-between text-sm text-slate-400">
                <p>Réduction</p>
                <p>-{reduction}€</p>
              </div>
            )}
            <div className="flex justify-between">
              <p>Total TTC</p>
              <p className="text-end">{totalUpdated}€</p>
            </div>
          </div>

          <Divider className="my-2" />

          <aside className="flex flex-col gap-4">
            <p className="text-start font-semibold uppercase">
              Livraison prévue le {deliveryDate}
            </p>

            <CartContentLines />
          </aside>
        </div>
      </div>
    </Wrapper>
  );
}

export default Checkout;
