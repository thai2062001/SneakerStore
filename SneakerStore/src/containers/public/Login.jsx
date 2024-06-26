import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Navbar from "./../../components/layout/Navbar";

function Login() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  return (
    <div className="flex flex-col">
      <Header />
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center">
        <form className="w-[800px] h-full flex flex-col flex-wrap justify-center items-center gap-4">
          <div className="w-full flex flex-row gap-4">
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full bg-gray-100 h-[40px] font-bold border-black py-1 focus:bg-white focus:outline-none  focus:border-b-2 transition-colors peer duration-300"
                autoComplete="off"
              />
              <label
                htmlFor="name"
                className={`absolute left-2 text-xs font-bold top-3 cursor-text transition-all duration-300 ${
                  name ? "-top-4 -left-0 text-black text-xs" : ""
                } peer-focus:-top-4 peer-focus:-left-0 peer-focus:text-black`}
              >
                FIRST NAME*
              </label>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="border p-2 w-full bg-gray-100 h-[40px] font-bold border-black py-1 focus:bg-white focus:outline-none  focus:border-b-2 transition-colors peer duration-1000"
                autoComplete="off"
              />
              <label
                htmlFor="lastname"
                className={`absolute left-2 text-xs font-bold top-3 cursor-text transition-all duration-300 ${
                  lastname ? "-top-4 -left-0 text-black text-xs" : ""
                } peer-focus:-top-4 peer-focus:-left-0 peer-focus:text-black`}
              >
                LAST NAME*
              </label>
            </div>
          </div>
          <div className="relative w-full mt-5">
            <input
              type="text"
              id="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="border p-2 w-full bg-gray-100 h-[40px] font-bold border-black py-1 focus:bg-white focus:outline-none  focus:border-b-2 transition-colors peer duration-300"
              autoComplete="off"
            />
            <label
              htmlFor="mail"
              className={`absolute left-2 text-xs font-bold top-3 cursor-text transition-all duration-300 ${
                mail ? "-top-4 -left-0 text-black text-xs" : ""
              } peer-focus:-top-4 peer-focus:-left-0 peer-focus:text-black`}
            >
              EMAIL ADDRESS*
            </label>
          </div>
          <div className="relative w-full mt-5">
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border p-2 w-full bg-gray-100 h-[40px] font-bold border-black py-1 focus:bg-white focus:outline-none  focus:border-b-2 transition-colors peer duration-300"
            >
              <option value="" disabled hidden></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label
              htmlFor="gender"
              className={`absolute left-2 text-xs font-bold top-3 cursor-text transition-all duration-300 ${
                gender ? "-top-4 -left-0 text-black text-xs" : ""
              } peer-focus:-top-4 peer-focus:-left-0 peer-focus:text-black`}
            >
              {gender ? "SELECT GENDER" : "SELECT GENDER"}
            </label>
          </div>
          <div className="relative w-full mt-5">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full bg-gray-100 h-[40px] font-bold border-black py-1 focus:bg-white focus:outline-none  focus:border-b-2 transition-colors peer duration-300"
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className={`absolute left-2 text-xs font-bold top-3 cursor-text transition-all duration-300 ${
                password ? "-top-4 -left-0 text-black text-xs" : ""
              } peer-focus:-top-4 peer-focus:-left-0 peer-focus:text-black`}
            >
              PASSWORD*
            </label>
          </div>
          <div className="flex">
            <button className="bg-black p-3 w-[100px] text-white font-bold hover:bg-gray-800">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
