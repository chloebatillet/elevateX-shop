import { Button } from "@nextui-org/react";
import Wrapper from "./Wapper.tsx";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // try {
    //   // Créer une demande de paiement avec Stripe
    //   const paymentIntent = await stripe.confirmCardPayment(
    //     "",
    //     {
    //       payment_method: {
    //         card: elements.getElement(PaymentElement),
    //         billing_details: {
    //           name: "John Doe",
    //         },
    //       },
    //     }
    //   );

    //   // Vérifier le résultat du paiement
    //   if (paymentIntent.error) {
    //     console.error("Erreur de paiement:", paymentIntent.error.message);
    //   } else if (
    //     paymentIntent.paymentIntent &&
    //     paymentIntent.paymentIntent.status === "succeeded"
    //   ) {
    //     console.log("Paiement réussi!");
    //   }
    // } catch (error) {
    //   console.error("Erreur lors du traitement du paiement:", error);
    // }


    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: "/shop",
    //   },
    // });

    // if (!error) {
    //   console.log("Token généré");
    // }
  };

  return (
    <Wrapper marginTop="150px">
      <form onSubmit={(e) => handleSubmit(e)} className="px-2 min-h-96 max-w-xl m-auto">
        <PaymentElement />
        <Button isDisabled={!stripe} type="submit" className="mt-8 w-full rounded bg-violet-500 text-md font-bold uppercase">
          Payer
        </Button>
      </form>
      <></>
    </Wrapper>
  );
}

export default CheckoutForm;
