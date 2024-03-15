import { Button } from "@nextui-org/react";
import Wrapper from "./Wapper.tsx";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { sendPayment } from "../store/reducers/orderReducer.ts";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const { isProcessing, message } = useAppSelector((state) => state.order);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const payment = await dispatch(sendPayment({ stripe, elements }));

    if (payment.payload === "succeeded") {
      navigate("/");
    }
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
