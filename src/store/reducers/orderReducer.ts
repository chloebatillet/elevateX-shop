import { createAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../@types";

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
}

export const initialState: OrdersState = {
  passedOrders: sessionStorage.getItem("passedOrders")
    ? JSON.parse(sessionStorage.getItem("passedOrders")!)
    : [],
  currentOrder: sessionStorage.getItem("currentOrder")
    ? JSON.parse(sessionStorage.getItem("currentOrder")!)
    : {
        content: sessionStorage.getItem("cart")
          ? JSON.parse(sessionStorage.getItem("cart")!)
          : [],
        dateOrder: "",
        deliveryDateEstimated: "",
        deliveryMode: "",
        subtotal: null,
        reduction: null,
        total: null,
        contactDetails: {},
        deliveryDetails: {},
        paymentMode: "",
      },
};

// Liste des actions
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

export const validateOrderDetails = createAction<any>("orders/validate-order-details");

// export const submitCode = createAction<string>("cart/submit-code");

const OrdersState = createSlice({
  name: "ordersReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.currentOrder.contactDetails =  action.payload.clientDetails
        state.currentOrder.deliveryDetails = action.payload.deliveryDetails;

        sessionStorage.setItem(
          "currentOrder",
          JSON.stringify(state.currentOrder)
        );
      })
  },
});

export default OrdersState.reducer;
