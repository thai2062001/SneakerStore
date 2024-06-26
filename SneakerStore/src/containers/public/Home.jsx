import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../features/user/userSlice";
import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
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

  return (
    <div>
      <Header />
      <Navbar />
      {user ? (
        <h1>Welcome, {user[1].username}</h1>
      ) : (
        <h1>No user data available</h1>
      )}
    </div>
  );
};

export default Home;
