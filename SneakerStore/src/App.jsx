// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/public/Home/Home";
import Header from "./components/layout/Header";
import Login from "./containers/public/Home/Login";
import Setting from "./containers/public/Home/UserSettings/Setting";
import SignUp from "./containers/public/Home/SignUp";
import { path } from "./utils/constants";
import ProductsPage from "./components/layout/Products/ProductListAll";
import ProductDetail from "./containers/public/ProductDetail/ProductDetail";
import CartPage from "./containers/public/Cart/CartPage";
import ConfirmCart from "./containers/public/Cart/ConfirmCart";
import SuccessPage from "./components/layout/ErrorPage/SucessPage";
import History from "./containers/public/Home/UserSettings/History";
import ReviewProduct from "./containers/public/Reviews/ReviewProduct";
import NotificationIcon from "./components/layout/notificationIcon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.HEADER} element={<Header />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.TEST} element={<NotificationIcon />} />
        <Route path={path.SIGNUP} element={<SignUp />} />
        <Route path={path.SETTING} element={<Setting />}>
          <Route path="profile" element={<Setting />} />
          <Route path="history" element={<History />} />
          <Route path="shipping" element={<Setting />} />
        </Route>
        <Route path={path.PRODUCT_PAGE} element={<ProductsPage />} />
        <Route path={path.PRODUCT_DETAIL_PAGE} element={<ProductDetail />} />
        <Route path={path.CART_PAGE_PAYMENT} element={<ConfirmCart />} />
        <Route path={path.CART_PAGE_DETAIL} element={<CartPage />} />
        <Route path={path.SUCESS_PAGE} element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
