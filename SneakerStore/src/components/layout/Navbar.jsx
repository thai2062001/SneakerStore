import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconHeart from "./Favorite";
import IconShoppingCart from "./cart";
const NavLinks = () => {
  return (
    <>
      <div className="hidden md:flex lg:flex justify-around w-full h-[50px] mx-auto items-center bg-black">
        <ul className="flex flex-wrap h-full gap-[30px]">
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out  focus:outline-none focus:ring-0">
            Men's
          </button>
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
            Women's
          </button>
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
            New Arrivals
          </button>
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
            Releases
          </button>
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
            Brands
          </button>
        </ul>
        <div className="flex h-full gap-[20px] justify-center items-center">
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out  focus:outline-none focus:ring-0">
            <IconHeart className="hover:cursor-pointer" />
          </button>
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out  focus:outline-none focus:ring-0">
            <IconShoppingCart className="hover:cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="flex ">
        <div className=" hidde flex w-full justify-center">
          <NavLinks />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
