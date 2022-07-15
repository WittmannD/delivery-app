import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  items: [],
  totalAmount: null,
  totalQuantity: null,
  shopId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    state: defaultState,
  },
  reducers: {
    setShoppingCart: (state, action) => {
      state.state = action.payload;
    },
    clearShoppingCart: (state) => {
      state.state = defaultState;
    },
  },
});

export const { setShoppingCart, clearShoppingCart } = cartSlice.actions;

export const getShoppingCart = (state) => state.cart.state;

export default cartSlice.reducer;
