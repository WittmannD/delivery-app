import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shops",
  initialState: {
    list: [],
  },
  reducers: {
    setShops: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setShops } = shopSlice.actions;

export const getShops = (state) => state.shops.list;

export default shopSlice.reducer;
