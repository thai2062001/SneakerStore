// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiAll } from "../../services/api";
import { path } from "../../utils/constants";
const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// Tạo async thunk để gọi API lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const data = await fetchApiAll(path.PRODUCT_GET_API); // Thay 'products' bằng endpoint phù hợp
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
