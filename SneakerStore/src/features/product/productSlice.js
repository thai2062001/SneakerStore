// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiAll, fetchApiById } from "../../services/api"; // Ensure you have a function to fetch by ID
import { path } from "../../utils/constants";

const initialState = {
  products: [],
  currentProduct: null,
  status: "idle",
  error: null,
};

// Create an async thunk to fetch products with filters
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (filters) => {
    const filteredFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          acc[key] = filters[key].filter((item) => !!item);
        } else {
          acc[key] = filters[key];
        }
      }
      return acc;
    }, {});

    const params = new URLSearchParams();
    Object.keys(filteredFilters).forEach((key) => {
      if (Array.isArray(filteredFilters[key])) {
        filteredFilters[key].forEach((value) => {
          params.append(key, value);
        });
      } else {
        params.set(key, filteredFilters[key]);
      }
    });

    const queryString = params.toString();
    const data = await fetchApiAll(`${path.PRODUCT_GET_API}?${queryString}`);
    return data;
  }
);

// Create an async thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId) => {
    const data = await fetchApiById(
      `${path.LOCAL}/${path.PRODUCT_GET_API}/${productId}`
    );
    console.log(data);
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
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
