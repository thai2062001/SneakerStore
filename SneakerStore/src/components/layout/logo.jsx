import { NavLink } from "react-router-dom";

import { path } from "./../../utils/constants";
export const Logo = () => {
  return (
    <div className="logo w-20 h-16 border-red-100">
      <NavLink to={path.HOME}>
        <img src="src\assets\logo.svg" alt="logo" className="object-contain" />
      </NavLink>
    </div>
  );
};
