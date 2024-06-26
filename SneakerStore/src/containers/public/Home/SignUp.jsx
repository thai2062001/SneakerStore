import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { createUser } from "../../../features/user/userSlice"; // Import action creator từ slice Redux
import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import { message } from "antd";
function SignUp() {
  const dispatch = useDispatch();

  const [username, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");
  const [role_id, setRole_id] = useState(2);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!username || !phone_number || !email || !password || !gender) {
      message.error("Please fill in all required fields.");
      return;
    }

    // Gọi action creator để dispatch action tạo tài khoản
    dispatch(
      createUser({ username, phone_number, email, password, gender, role_id })
    );
    navigate("/login");
    setName("");
    setMail("");
    setPhone_number("");
    setPassword("");
    setGender("");
  };

  return (
    <div className="flex flex-col ">
      <Header />
      <Navbar />
      <div className="w-full h-screen flex justify-center items-center mt-[100px]">
        <form
          className="w-[800px] h-full flex flex-col flex-wrap items-center gap-4"
          onSubmit={handleSignUp}
        >
          <div className="w-full flex flex-row gap-4">
            <div className="relative w-full">
              <TextField
                id="name"
                label="USERNAME*"
                variant="filled"
                value={username}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputProps={{
                  className: "text-black font-bold ", // Thay đổi màu text ở đây
                }}
                InputLabelProps={{
                  className: "text-black font-bold", // Thay đổi màu label ở đây
                }}
              />
            </div>
            <div className="relative w-full">
              <TextField
                id="phone_number"
                label="PHONE NUMBER*"
                variant="filled"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                fullWidth
                InputProps={{
                  className: "text-black font-bold", // Thay đổi màu text ở đây
                }}
                InputLabelProps={{
                  className: "text-black font-bold", // Thay đổi màu label ở đây
                }}
              />
            </div>
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
              id="gender"
              label="GENDER*"
              variant="filled"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              select
              fullWidth
              InputProps={{
                className: "text-black font-bold", // Thay đổi màu text ở đây
              }}
              InputLabelProps={{
                className: "text-black font-bold", // Thay đổi màu label ở đây
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
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
          <div className="w-full">
            <h2>
              <NavLink to="/login">
                Do you have an account? Click to Login
              </NavLink>
            </h2>
          </div>
          <div className="flex mt-5 w-full">
            <Button
              type="submit"
              variant="contained"
              className="bg-black p-3 w-[100px] text-white font-bold hover:bg-gray-800"
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
