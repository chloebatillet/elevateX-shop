import { createAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../@types";

interface CartState {
  content: (CartItem | null)[];
  promoMessage: string;
  reduction: number;
}

export const initialState: CartState = {
  content: sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart")!)
    : [],
  promoMessage: "",
  reduction: 0,
};

// Liste des actions
export const addToCart = createAction<CartItem>("cart/add-to-cart");

export const removeFromCart = createAction<CartItem>("cart/remove-from-cart");

export const submitCode = createAction<string>("cart/submit-code");

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart, (state, action) => {
        state.content.push(action.payload);
        sessionStorage.setItem("cart", JSON.stringify(state.content));
      })
      .addCase(removeFromCart, (state, action) => {
        state.content.push(action.payload);
        sessionStorage.setItem("cart", JSON.stringify(state.content));
      })
      .addCase(submitCode, (state) => {
        state.reduction = 10;
        state.promoMessage = "Code appliqué !";
      });
  },
});

export default cartReducer.reducer;
