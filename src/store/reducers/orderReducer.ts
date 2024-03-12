import { createAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../@types";

interface ContactDetails {
  firstname: string;
  name: string;
  address: string;
  postalCode: number;
  city: string;
  country: string;
  telephone: number;
  email: string;
}

interface Order {
  content: (CartItem | null)[];
  dateOrder: string;
  deliveryDateEstimated: string;
  deliveryMode: string;
  subtotal: number;
  total: number;
  contactDetails: ContactDetails;
  paymentMode: string;
}

interface OrdersState {
  passedOrders: Order[];
  currentOrder: Order;
}

export const initialState: OrdersState = {
  passedOrders: sessionStorage.getItem("passedOrders")
    ? JSON.parse(sessionStorage.getItem("passedOrders")!)
    : [],
  currentOrder: sessionStorage.getItem("currentOrder")
    ? JSON.parse(sessionStorage.getItem("currentOrder")!)
    : {
        content: sessionStorage.getItem("cart"),
        dateOrder: "",
        deliveryDateEstimated: "",
        deliveryMode: "",
        subtotal: null,
        total: null,
        contactDetails: {},
        paymentMode: "",
      },
};

// Liste des actions
export const validateCart = createAction<{
  subTotal: number | undefined;
  total: number;
  deliveryOption: string;
}>("orders/validate-cart");

// export const submitCode = createAction<string>("cart/submit-code");

const OrdersState = createSlice({
  name: "ordersReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(validateCart, (state, action) => {
      state.currentOrder.subtotal = action.payload.subTotal!;
      state.currentOrder.total = action.payload.total;
      state.currentOrder.deliveryMode = action.payload.deliveryOption;
      sessionStorage.setItem(
        "currentOrder",
        JSON.stringify(state.currentOrder)
      );
    });
    // .addCase(submitCode, (state) => {});
  },
});

export default OrdersState.reducer;
