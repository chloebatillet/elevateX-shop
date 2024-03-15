import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../@types";
import { Stripe, StripeElements } from "@stripe/stripe-js";

interface ContactDetails {
  firstname: string;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  telephone?: number;
  email: string;
}

interface DeliveryDetails {
  name?: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  telephone?: number;
  email: string;
}

interface Order {
  content: (CartItem | null)[];
  dateOrder: string;
  deliveryDateEstimated: string;
  deliveryMode: string;
  subtotal: number;
  reduction: number;
  total: number;
  contactDetails: ContactDetails;
  deliveryDetails: DeliveryDetails;
  paymentMode: string;
}

interface OrdersState {
  passedOrders: Order[];
  currentOrder: Order;
  clientSecret: string | null;
  isProcessing: boolean;
  message: string | null;
}

const emptyCurrentOrder: Order = {
  content: [],
  dateOrder: "",
  deliveryDateEstimated: "",
  deliveryMode: "",
  subtotal: 0,
  reduction: 0,
  total: 0,
  contactDetails: {
    firstname: "",
    name: "",
    address: "",
    postalCode: 0,
    city: "",
    country: "",
    telephone: 0,
    email: "",
  },
  deliveryDetails: {
    address: "",
    postalCode: 0,
    city: "",
    country: "",
    email: "",
  },
  paymentMode: "",
};

export const initialState: OrdersState = {
  passedOrders: sessionStorage.getItem("passedOrders")
    ? JSON.parse(sessionStorage.getItem("passedOrders")!)
    : [],
  currentOrder: sessionStorage.getItem("currentOrder")
    ? JSON.parse(sessionStorage.getItem("currentOrder")!)
    : emptyCurrentOrder,
  clientSecret: null,
  isProcessing: false,
  message: null,
};

// Liste des actions
export const addToCart = createAction<CartItem>("orders/add-to-cart");

export const removeFromCart = createAction<number>("orders/remove-from-cart");

export const submitCode = createAction<string>("orders/submit-code");

export const validateCart = createAction<{
  subTotal: number | undefined;
  reduction: number;
  total: number;
  deliveryOption: string;
}>("orders/validate-cart");

export const selectDeliveryOption = createAction<{
  deliveryOption: string;
  totalUpdated: number;
}>("orders/select-delivery-option");

export const validateOrderDetails = createAction<any>(
  "orders/validate-order-details"
);

export const createPaymentIntent = createAsyncThunk(
  "orders/create-payment-intent",
  async (total: number) => {
    try {
      const response = await fetch(
        "https://elevatex-backoffice.vercel.app/create-payment-intent",
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
      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

export const sendPayment = createAsyncThunk(
  "orders/send-payment",
  async ({
    stripe,
    elements,
  }: {
    stripe: Stripe;
    elements: StripeElements;
  }) => {
    try {
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/cart/pass-your-order/success",
        },
        redirect: "if_required",
      });

      return response;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

const OrdersState = createSlice({
  name: "ordersReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart, (state, action) => {
        state.currentOrder.content.push(action.payload);
        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(removeFromCart, (state, action) => {
        state.currentOrder.content = state.currentOrder.content.filter(
          (_, i) => i !== action.payload
        );

        if (state.currentOrder.content.length === 0) {
          state.currentOrder.reduction = 0;
        }

        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(submitCode, (state) => {
        state.currentOrder.reduction = 10;
        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(validateCart, (state, action) => {
        state.currentOrder.subtotal = action.payload.subTotal!;
        state.currentOrder.reduction = action.payload.reduction;
        state.currentOrder.total = action.payload.total;
        state.currentOrder.deliveryMode = action.payload.deliveryOption;
        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(selectDeliveryOption, (state, action) => {
        state.currentOrder.deliveryMode = action.payload.deliveryOption;
        state.currentOrder.total = action.payload.totalUpdated;

        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(validateOrderDetails, (state, action) => {
        state.currentOrder.contactDetails = action.payload.clientDetails;
        state.currentOrder.deliveryDetails = action.payload.deliveryDetails;

        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(sendPayment.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(sendPayment.fulfilled, (state) => {
        state.passedOrders.push(state.currentOrder);
        sessionStorage.setItem(
          "passedOrders",
          JSON.stringify(state.passedOrders)
        );
        state.currentOrder = emptyCurrentOrder;

        // empty sessionStorage
        sessionStorage.removeItem("currentOrder");
        sessionStorage.removeItem("cart");

        state.clientSecret = null;
        state.isProcessing = false;
      })
      .addCase(sendPayment.rejected, (state, action) => {
        state.message = action.error.message!;
      });
  },
});

export default OrdersState.reducer;
