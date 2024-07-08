import React from "react";
import { Logo } from "./logo";
import Nav from "./Nav";
import SearchInput from "./SearchInput";
// src/index.css
import "../../App.css";
function Header() {
  return (
    <header className="bg-black justify-around md:justify-center flex-wrap  top-0 z-[20] mx-auto flex w-full items-center lg:justify-center border-b border-gray-300 p-5">
      <Logo />
      <SearchInput className="mt-5" />
      <Nav />
    </header>
  );
}

export default Header;
