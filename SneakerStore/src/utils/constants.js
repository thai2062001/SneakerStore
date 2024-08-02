export const path = {
  HOME: "/*",
  LOGIN: "/login",
  HEADER: "/header",
  SIGNUP: "/signup",
  SETTING: "/user/setting",
  TEST: "/test",
  PRODUCT_PAGE: "/products",
  PRODUCT_DETAIL_PAGE: "/products/:productId", // Add a dynamic parameter
  CART_PAGE_DETAIL: "/cart/cartdetail",
  CART_PAGE_PAYMENT: "/cart/cartdetail/payment",
  SUCESS_PAGE: "/cart/cartdetail/payment/success",
  HISTORY_PAGE: "/user/setting/historyorder",

  //ADMIN

  //USER
  LOCAL: "http://localhost:3000",
  LOGIN_API_END_POINT: "auth/login",
  CREATE_USER_END_POINT: "users",
  PRODUCT_GET_API: "products",
  STOCK_GET_API: "stock",
  ORDER_API: "orders",
  CART_ITEM_API: "cart-items",
  ORDER_ITEM_API: "",
  INVOICE_API: "",
  REVIEW_API: "reviews",
  NOTIFICATION_API: "notifications",
  //API
};
