import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    sellerProducts: [],
    // loading: false,
    // error: null,
  },
  reducers: {
    setsellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
});

export const { setsellerProducts } = productSlice.actions;

export default productSlice.reducer;