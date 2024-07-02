// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/public/Home/Home";
import Header from "./components/layout/Header";
import Login from "./containers/public/Home/Login";
import Setting from "./containers/public/Home/Setting";
import SignUp from "./containers/public/Home/SignUp";
import SlideCardProduct from "./components/layout/slideCardProduct";
import Brands from "./components/layout/Brands";
import { path } from "./utils/constants";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.HEADER} element={<Header />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.SIGNUP} element={<SignUp />} />
        <Route path={path.SETTING} element={<Setting />} />
        <Route path={path.TEST} element={<Brands />} />
      </Routes>
    </Router>
  );
}

export default App;
