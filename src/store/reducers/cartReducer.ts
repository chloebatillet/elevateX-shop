import { createAction, createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../@types";

interface CartState {
  content: (CartItem | null)[];
}

export const initialState: CartState = {
  content: sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart")!)
    : [],
};

// Liste des actions
export const addToCart = createAction<CartItem>("cart/addToCart");

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart, (state, action) => {
      state.content.push(action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.content));
    });
  },
});

export default cartReducer.reducer;
