import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconMenu from "./menu";
import IconXLg from "./X";
import IconPersonFill from "./loginIcon";
const NavLinks = () => {
  return (
    <>
      <NavLink to="/about" className="hover:cursor-pointer text-md text-white">
        About
      </NavLink>
      <NavLink
        to="/login"
        className="hover:cursor-pointer text-md text-white flex justify-center items-center gap-2"
      >
        <IconPersonFill />
        Login
      </NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className="flex  justify-center items-center mt-4 ml-10">
        <div className=" hidden md:flex w-full justify-center gap-[30px]">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavBar}>
            {isOpen ? <IconXLg /> : <IconMenu />}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex flex-col basis-full items-center">
          <NavLink
            to="/about"
            className="hover:cursor-pointer text-md text-white"
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className="hover:cursor-pointer text-md text-white flex justify-center items-center gap-2 mr-6"
          >
            <IconPersonFill />
            Login
          </NavLink>
          <NavLink
            to="/men"
            className="hover:border-b-white text-md font-serif font-bold text-white"
          >
            Men's
          </NavLink>
          <NavLink
            to="/woman"
            className="hover:border-b-white text-md font-serif font-bold  text-white"
          >
            Women's
          </NavLink>
          <NavLink
            to="/newarrivals"
            className="hover:border-b-white text-md font-serif font-bold text-white"
          >
            New Arrivals
          </NavLink>
          <NavLink
            to="/newarrivals"
            className="hover:border-b-white text-md font-serif font-bold  text-white"
          >
            Releases
          </NavLink>
          <NavLink
            to="/brands"
            className="hover:border-b-white text-md font-serif font-bold  text-white"
          >
            Brands
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
