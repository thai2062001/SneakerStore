import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import IconMenu from "./menu";
import IconXLg from "./X";
import { useNavigate } from "react-router-dom";
import IconPersonFill from "./loginIcon";
import { decodeToken } from "../../utils/decodeToken";
const NavLinks = () => {
  // Kiểm tra xem có access token trong localStorage không
  const token = localStorage.getItem("access-token");
  let username = "";
  const navigate = useNavigate();
  if (token) {
    // Nếu có token, giải mã để lấy thông tin user (ví dụ: username)
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      username = decodedToken; // Thay đổi username tùy thuộc vào cấu trúc của token
    } else {
      username = "Login";
    }
  }
  const handleNavigate = () => {
    // Nếu username có dữ liệu, navigate tới Settings
    if (username) {
      navigate("/user/setting");
    } else {
      // Ngược lại, navigate tới Login
      navigate("/login");
    }
  };

  return (
    <>
      <NavLink to="/about" className="hover:cursor-pointer text-md text-white">
        About
      </NavLink>
      <span
        onClick={handleNavigate}
        className="hover:cursor-pointer text-md text-white flex justify-center items-center gap-2"
      >
        <IconPersonFill />
        {username ? username : "Login"}{" "}
        {/* Thay đổi nội dung dựa vào username */}
      </span>
    </>
  );
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("access-token");
  let username = "";

  if (token) {
    // Nếu có token, giải mã để lấy thông tin user (ví dụ: username)
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      username = decodedToken; // Thay đổi username tùy thuộc vào cấu trúc của token
    }
  }
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex justify-center items-center mt-4 ml-10">
        <div className="hidden md:flex w-full justify-center gap-[30px]">
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
            {username ? username : "Login"}{" "}
            {/* Thay đổi nội dung dựa vào username */}
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
