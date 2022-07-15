import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export const getProducts = (state) => state.products.list;

export default productSlice.reducer;
