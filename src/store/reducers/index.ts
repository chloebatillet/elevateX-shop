import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import productsReducer from "./productsReducer";

const reducer = {
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
};

export default reducer;
