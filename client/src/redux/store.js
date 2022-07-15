import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice";
import shopReducer from "./slices/shop.slice";
import cartReducer from "./slices/cart.slice";

export default configureStore({
  reducer: {
    products: productReducer,
    shops: shopReducer,
    cart: cartReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
