import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OuBx0GK61RB3NN49QlQmGktGvskO1HsjwvpsM9DhLyjrydZscfBhC7s0IZglYFUr49Y40YomrRjeK2JxI21GTqS003aearu54"
);

function Checkout() {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: 1099,
        currency: "usd",
      }}
      /*option: secret key not mandatory*/
    >
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
