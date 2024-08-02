import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconHeart from "./Favorite";
import IconShoppingCart from "./cart";
import CartPageSmall from "../../containers/public/Cart/CartPageSmaill";
import NotificationIcon from "./notificationIcon";
const NavLinks = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [showCartSmall, setShowCartSmall] = useState(false);

  const toggleCartSmall = () => {
    setShowCartSmall(!showCartSmall);
  };
  const handleCloseCart = () => {
    setShowCartSmall(false);
  };

  return (
    <>
      <div className="hidden md:flex lg:flex justify-around w-full h-[50px] mx-auto items-center bg-black">
        <ul className="flex flex-wrap h-full gap-[30px]">
          <li>
            <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
              <NavLink to="/products?gender=men">Men's</NavLink>
            </button>
          </li>
          <li>
            <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
              <NavLink to="/products?gender=women">Women's</NavLink>
            </button>
          </li>
          <li>
            <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
              <NavLink to="/products/items/new-arrivals">New Arrivals</NavLink>
            </button>
          </li>
          <li>
            <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
              <NavLink to="/products/items/releases">Releases</NavLink>
            </button>
          </li>
          <li>
            <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
              <NavLink to="/products/brands">Brands</NavLink>
            </button>
          </li>
        </ul>
        <div className="relative h-full flex gap-[20px] justify-center items-center">
          <button className="text-sm bg-black h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0">
            <IconHeart fill="#ffffff" className="hover:cursor-pointer" />
          </button>
          <button
            onClick={toggleCartSmall}
            className="text-sm bg-black w-[25px] h-full font-bold text-white hover:border-b-2 hover:border-white transition duration-2000 ease-in-out focus:outline-none focus:ring-0 relative"
            style={{ overflow: "visible" }}
          >
            <IconShoppingCart className="hover:cursor-pointer" />
            {cartItemCount > 0 && (
              <span className="absolute top-[0.75rem] right-[0.60rem] w-[1rem] text-center h-[1.1rem] bg-white text-black text-[10px] rounded-full  transform translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
          {showCartSmall && (
            <div className="absolute z-50 top-full left-0 mt-2">
              <CartPageSmall onClose={handleCloseCart} />
            </div>
          )}
          <NotificationIcon />
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full">
        <div className="flex w-full justify-center">
          <NavLinks />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
