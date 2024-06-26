// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/public/Home";
import Header from "./components/layout/Header";
import Login from "./containers/public/Login";
import { path } from "./utils/constants";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.HEADER} element={<Header />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
