import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApiAll } from "../../services/api";
import { path } from "../../utils/constants";

const initialState = {
  stocks: [],
  status: "idle",
  error: null,
};

// Tạo async thunk để gọi API lấy danh sách sản phẩm
export const fetchStocks = createAsyncThunk("stock/fetchStocks", async () => {
  try {
    const data = await fetchApiAll(path.STOCK_GET_API);
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Failed to fetch stocks: " + error.message);
  }
});

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setStocks } = stockSlice.actions;

export default stockSlice.reducer;
