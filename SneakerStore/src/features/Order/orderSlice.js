// src/store/orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "../../services/api";
import { path } from "../../utils/constants";
import { notification } from "antd";
// Trạng thái ban đầu của Order
const initialState = {
  orders: [],
  status: "idle",
  error: null,
};
import { fetchApiAll } from "../../services/api";

// Tạo async thunk để gọi API tạo order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await createApi(
        `${path.LOCAL}/${path.ORDER_API}`,
        orderData
      );
      notification.success({
        message: "Success",
        description: "Transaction completed ",
      });
      // console.log(data, "data");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchOrder = createAsyncThunk("orders/fetchOrder", async () => {
  try {
    const data = await fetchApiAll(path.ORDER_API);
    console.log(data, "data");
    return data;
  } catch (error) {
    throw Error("Failed to fetch stocks: " + error.message);
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // cập nhật toàn bộ orders thay vì push
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
