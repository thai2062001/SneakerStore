import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import { path } from "../../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/user/userSlice";
import { decodeToken } from "../../../utils/decodeToken";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [userList, setUser] = useState();
  const [userDecoded, setUserDecoded] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      const decodedUser = decodeToken(token);
      setUserDecoded(decodedUser);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("access-token");
    navigate(path.HOME);
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <div className="flex-1 flex">
        <ul className="w-[300px] bg-[#FAFAFA] h-screen hidden flex-col md:flex  ">
          <li className="flex items-center h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1">
            <div className="flex flex-col flex-1 p-5">
              <p className="font-medium text-[0.75em] md:text-[1.5em]">
                {userDecoded ? userDecoded : "Username"}
              </p>
            </div>
          </li>
          <li className="flex items-center h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1">
            <div className="w-1/6">
              <img
                src="https://res.cloudinary.com/dpdzbuiml/image/upload/v1719478354/user_ijh4n4.png"
                className="w-6 h-6 justify-center items-center"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <p className="font-medium">Profile</p>
              <p className="text-sm">Username, Email, Password,</p>
            </div>
          </li>
          <li className="flex items-center  h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1">
            <div className="w-1/6">
              <img
                src="https://res.cloudinary.com/dpdzbuiml/image/upload/v1719479457/box_deheot.png"
                className="w-6 h-6 justify-center items-center"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <p className="font-medium">History</p>
              <p className="text-sm">the items you have purchased</p>
            </div>
          </li>
          <li className="flex items-center  h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1">
            <div className="w-1/6">
              <img
                src="https://res.cloudinary.com/dpdzbuiml/image/upload/v1719480902/location_srh6bc.png"
                className="w-6 h-6 justify-center items-center"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <p className="font-medium">Address</p>
              <p className="text-sm">Shiping,country,city</p>
            </div>
          </li>
          <li className="flex items-center  h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1">
            <div className="w-1/6">
              <img
                src="https://res.cloudinary.com/dpdzbuiml/image/upload/v1719481159/heart_pqb4lx.png"
                className="w-6 h-6 justify-center items-center"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <p className="font-medium">Favorite</p>
              <p className="text-sm">items and lists you've saved</p>
            </div>
          </li>
          <li
            onClick={handleLogOut}
            className="flex items-center h-[80px] cursor-pointer hover:bg-gray-200 p-2  border-gray-500 outline-1"
          >
            <div className="w-1/6">
              <img
                src="https://res.cloudinary.com/dpdzbuiml/image/upload/v1719479457/logout_pwdjbh.png"
                className="w-6 h-6 justify-center items-center"
              />
            </div>
            <div className="flex flex-col flex-1 ">
              <p className="font-medium">Logout</p>
            </div>
          </li>
        </ul>
        <div className="flex-1 bg-green-500 h-full">
          <h1>profile</h1>
        </div>
      </div>
    </div>
  );
};

export default Setting;
