import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/user/userSlice";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constants";
const Setting = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("access-token");
    navigate(path.HOME);
  };
  return (
    <div>
      <Header />
      <Navbar />
      <h1>Setting</h1>
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default Setting;
