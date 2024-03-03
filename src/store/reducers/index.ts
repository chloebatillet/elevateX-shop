import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";

const reducer = {
  products: productsReducer,
  cart: cartReducer,
};

export default reducer;
