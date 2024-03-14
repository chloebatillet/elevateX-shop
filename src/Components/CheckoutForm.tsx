import { Button } from "@nextui-org/react";
import Wrapper from "./Wapper.tsx";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/cart/pass-your-order/success",
      },
    });

    if (error && error.message) {
      setMessage(error.message);
      console.error(error);
    }

    setIsProcessing(false);
  };

  return (
    <Wrapper marginTop="150px">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="px-2 min-h-96 max-w-xl m-auto"
      >
        <PaymentElement />
        <Button
          isDisabled={!stripe}
          type="submit"
          className="mt-8 w-full rounded bg-violet-500 text-md font-bold uppercase"
        >
          {isProcessing ? "En cours..." : "Payer"}
        </Button>

        {message && <p>{message}</p>}
      </form>
      <></>
    </Wrapper>
  );
}

export default CheckoutForm;
