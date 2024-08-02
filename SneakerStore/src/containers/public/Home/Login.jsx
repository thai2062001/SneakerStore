import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { loginUser } from "../../../features/user/userSlice";
import { NavLink } from "react-router-dom";
import { message } from "antd";

function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!email || !password) {
      message("Please fill in all required fields.");
      return;
    }
    try {
      const response = await dispatch(loginUser({ email, password }));
      if (response.type === "user/loginUser/fulfilled") {
        // Đăng nhập thành công, navigate tới trang home
        navigate("/home");
      } else {
        // Đăng nhập thất bại, hiển thị lỗi
        console.error("Login failed:", response.payload);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    // setPhone_number("");
    // setPassword("");
  };
  return (
    <div className="flex flex-col ">
      <Header />
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center ">
        <form
          onSubmit={handleSignIn}
          className="w-[600px] h-full flex flex-col flex-wrap gap-4 mt-[100px]"
        >
          <div>
            <h1 className="text-[30px] font-bold">Sign In</h1>
          </div>
          <div className="relative w-full mt-5">
            <TextField
              id="mail"
              label="EMAIL ADDRESS*"
              variant="filled"
              value={email}
              onChange={(e) => setMail(e.target.value)}
              fullWidth
              InputProps={{
                className: "text-black font-bold", // Thay đổi màu text ở đây
              }}
              InputLabelProps={{
                className: "text-black font-bold", // Thay đổi màu label ở đây
              }}
            />
          </div>
          <div className="relative w-full mt-5">
            <TextField
              id="password"
              label="PASSWORD*"
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                className: "text-black font-bold", // Thay đổi màu text ở đây
              }}
              InputLabelProps={{
                className: "text-black font-bold", // Thay đổi màu label ở đây
              }}
            />
          </div>
          <div className="flex mt-5 w-full gap-5">
            <Button
              variant="contained"
              className="bg-white w-full p-3  text-black font-bold peer"
            >
              <NavLink to="/signup" className="w-full">
                SIGN UP
              </NavLink>
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-black p-3 w-full text-white font-bold hover:bg-gray-800"
            >
              LOGIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
