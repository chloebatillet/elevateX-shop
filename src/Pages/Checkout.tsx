import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";

const stripePromise = loadStripe(
  "pk_test_51OuBx0GK61RB3NN49QlQmGktGvskO1HsjwvpsM9DhLyjrydZscfBhC7s0IZglYFUr49Y40YomrRjeK2JxI21GTqS003aearu54"
);

function Checkout() {
  //const [stripePromise, setStripePromise] = useState(stripePromiseLD);
  const [clientSecret, setClientSecret] = useState(null);

  const { total } = useAppSelector((state) => state.order.currentOrder);

  //   async function fetchClientSecret() {
  //     try {
  //       const response = await fetch("http://localhost:5252/config", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Erreur lors de la récupération du client secret");
  //       }

  //       const data = await response.json();
  //       console.log(data);
  //       setStripePromise(data.publishableKey);

  //       // return data.publishableKey;
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de la requête pour récupérer le client secret:",
  //         error
  //       );
  //       throw error;
  //     }
  //   }

  async function createPaymentIntent() {
    try {
      const response = await fetch(
        "http://localhost:5252/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ total: total }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du client secret");
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);

      // return data.publishableKey;
    } catch (error) {
      console.error(
        "Erreur lors de la requête pour récupérer le client secret:",
        error
      );
      throw error;
    }
  }

  //   useEffect(() => {
  //     fetchClientSecret();
  //   }, []);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          //   options={{
          //     mode: "payment",
          //     amount: 1099,
          //     currency: "usd",
          //   }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Checkout;
