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
  reduction: Number(sessionStorage.getItem("codeReduction")) || 0,
};

// Liste des actions
export const addToCart = createAction<CartItem>("cart/add-to-cart");

export const removeFromCart = createAction<number>("cart/remove-from-cart");

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
        state.content = state.content.filter((_, i) => i !== action.payload);
        sessionStorage.setItem("cart", JSON.stringify(state.content));

        // const test = state.content.filter(
        //   (e) =>
        //     e?.model !== action.payload.model && e?.size === action.payload.size
        // );

        // test.map((e) => console.log(e?.model));
      })
      .addCase(submitCode, (state) => {
        state.reduction = 10;
        state.promoMessage = "Code appliqué !";
        sessionStorage.setItem("codeReduction", state.reduction.toString())
      });
  },
});

export default cartReducer.reducer;
