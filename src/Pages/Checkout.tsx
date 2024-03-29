import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createPaymentIntent } from "../store/reducers/orderReducer";

const stripePromise = loadStripe(
  "pk_test_51OuBx0GK61RB3NN49QlQmGktGvskO1HsjwvpsM9DhLyjrydZscfBhC7s0IZglYFUr49Y40YomrRjeK2JxI21GTqS003aearu54"
);

function Checkout() {
  const dispatch = useAppDispatch();
  const { clientSecret } = useAppSelector((state) => state.order);
  const { total } = useAppSelector((state) => state.order.currentOrder);

  useEffect(() => {
    dispatch(createPaymentIntent(total));
  }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Checkout;
