// src/cart/cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchApiAll, fetchApiById } from "../../services/api";
// Define initial state
const initialState = {
  cart: null,
  status: "idle",
  error: null,
};

// Define async thunks for API calls
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (createCartDto, { rejectWithValue }) => {
    try {
      const response = await axios.post("/cart", createCartDto);
      console.log(response, "post");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchApiById(`/cart/user/${userId}`);
      console.log(response, "cart");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
