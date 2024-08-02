import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import stockReducer from "../features/stock/stockSlice";
import cartReducer from "../features/Cart/cartSlice"; // Xóa và thêm lại dòng này
import cartItemsReducer from "../features/Cart/cartItemSlice";
import orderReducer from "../features/Order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";
import notificationsReducer from "../features/Notification/notificationSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    stock: stockReducer,
    cart: cartReducer,
    cartItems: cartItemsReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    notifications: notificationsReducer,
  },
});

export default store;
