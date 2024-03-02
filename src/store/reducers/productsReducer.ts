import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Product } from "../../@types";

import { products } from "../../assets/products.json";

interface ProductsState {
  list: Product[];
  filteredList: Product[];
  isLoading: boolean;
}

export const initialState: ProductsState = {
  list: products,
  filteredList: products,
  isLoading: false,
};

// Liste des actions
export const filterPrice = createAsyncThunk(
  "products/filterPrice",
  async (maxPrice: string[]) => {
    try {
      console.log(maxPrice);
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  }
);

export const order = createAsyncThunk(
  "products/order",
  async (type: string) => {
    try {
      let newList;
      switch (type) {
        case "priceUp":
          newList = [...initialState.list].sort((a, b) => a.price - b.price);
          break;
        case "priceDown":
          newList = [...initialState.list].sort((a, b) => b.price - a.price);
          break;
        case "popularity":
          newList = [...initialState.list].sort((a, b) => b.likes - a.likes);
          break;
        case "newest":
          newList = [...initialState.list].sort((a, b) => b.likes - a.likes);
          break;

        default:
          break;
      }
      return newList;
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  }
);

export const resetList = createAsyncThunk("products/resetList", async () => {
  try {
    console.log("reset");
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
});

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterPrice.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(filterPrice.fulfilled, (state /*action*/) => {
      //state.list = action.payload;
      state.isLoading = false;
    })
    .addCase(filterPrice.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(order.fulfilled, (state, action) => {
      state.filteredList = action.payload!;
    })
    .addCase(resetList.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(resetList.fulfilled, (state /*action*/) => {
      state.filteredList = initialState.filteredList;
      state.isLoading = false;
    })
    .addCase(resetList.rejected, (state) => {
      state.isLoading = false;
    });
});

export default productsReducer;
