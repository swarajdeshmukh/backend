import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    sellerProducts: [],
    products: [],
    product: null,
  },
  reducers: {
    setsellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setsellerProducts, setProducts, setProduct } = productSlice.actions;

export default productSlice.reducer;