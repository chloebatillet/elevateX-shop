import orderReducer from "./orderReducer";
import productsReducer from "./productsReducer";

const reducer = {
  products: productsReducer,
  order: orderReducer,
};

export default reducer;
