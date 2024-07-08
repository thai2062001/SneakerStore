import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../features/user/userSlice";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import SlideBanner from "../../../components/layout/SlideBanner";
import Brands from "../../../components/layout/Brands";
import SlideCardProduct from "../../../components/layout/slideCardProduct";
import BannerProduct from "../../../components/layout/BannerProduct";
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
      <SlideBanner />
      <Brands />
      <BannerProduct />
      <SlideCardProduct />
      <h1>No user data available</h1>
      <Footer />
    </div>
  );
};

export default Home;
