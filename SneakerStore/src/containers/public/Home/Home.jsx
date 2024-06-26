import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/user/userSlice";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
const Home = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [userList, setUser] = useState();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  useEffect(() => {
    setUser(user);
  }, [user]);
  console.log(user);

  return (
    <div>
      <Header />
      <Navbar />

      <h1>No user data available</h1>
    </div>
  );
};

export default Home;
