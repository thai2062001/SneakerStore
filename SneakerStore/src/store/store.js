import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import stockReducer from "../features/stock/stockSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    stock: stockReducer,
  },
});

export default store;
