import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  async (maxPrice: number) => {
    try {
      console.log(maxPrice);

      const filtered_products = [...initialState.filteredList].filter(
        (item) => {
          return item.price <= maxPrice;
        }
      );

      console.log(filtered_products);

      return filtered_products;
    } catch (error: any) {
      console.log("error");

      throw new Error(error.response.data.error);
    }
  }
);

export const filterBy = createAsyncThunk(
  "products/filterBy",
  async ({ type, keys }: { type: string; keys: any }) => {
    try {
      let newList, key: "colour" | "collection" | "size-available";

      switch (type) {
        case "Couleurs":
          key = "colour";
          break;
        case "Collections":
          key = "collection";
          break;
        case "Pointure":
          key = "size-available";
          break;

        default:
          break;
      }

      newList = [...initialState.filteredList].filter((e) => {
        const keyValues = Array.isArray(e[key])
          ? e[key].map(String)
          : [String(e[key])];

        if (keyValues.some(Array.isArray)) {
          // Si au moins une valeur est un tableau, on le traite comme tel
          return keys.some((v: any) =>
            keyValues.some((val: any) => val.includes(v.toString()))
          );
        } else {
          // Sinon, on traite comme une chaîne simple
          return keys.some((v: any) => keyValues.includes(v.toString()));
        }
      });
      console.log(newList);

      return newList;
    } catch (error: any) {
      console.log(error);

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

export const reset = createAction("products/reset");

const productsReducer = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterPrice.fulfilled, (state, action) => {
        state.filteredList = action.payload;
        state.isLoading = false;
      })
      .addCase(filterPrice.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.filteredList = action.payload!;
      })
      .addCase(filterBy.fulfilled, (state, action) => {
        state.filteredList = action.payload!;
      })
      .addCase(reset, (state) => {
        state.filteredList = state.list;
      });
  },
});

export default productsReducer.reducer;
