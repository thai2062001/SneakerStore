import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { path } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { notification } from "antd";
// Thunk để lấy dữ liệu người dùng từ API
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
});
// Thunk để tạo người dùng mới
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/${path.CREATE_USER_END_POINT}`,
        userData
      );
      notification.success({
        message: "Success",
        description: "Account created successfully! ",
      });
      return response.data;
    } catch (error) {
      message.error("Error creating account. Please try again.");
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login", // Đường dẫn endpoint đăng nhập của bạn
        userData
      );
      // Kiểm tra nếu server trả về một phản hồi không hợp lệ (ví dụ: không có access_token)
      if (!response.data.access_token) {
        message.error("Invalid email or password");
        return rejectWithValue("Invalid response from server");
      }
      // Lưu token hoặc thông tin người dùng vào localStorage nếu cần thiết
      localStorage.setItem("access-token", response.data.access_token);
      message.success("Login successful!");

      // Sử dụng navigate để điều hướng người dùng đến trang "/home" sau khi đăng nhập thành công
      // Hiển thị thông báo thành công

      return response.data; // Trả về dữ liệu người dùng hoặc token
    } catch (error) {
      // Xử lý lỗi từ server và hiển thị thông báo lỗi
      if (error.response && error.response.data) {
        message.error(error.response.data.message || "Login failed");
        return rejectWithValue(error.response.data);
      } else {
        message.error("Login failed. Please try again later.");
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload; // Cập nhật dữ liệu người dùng mới vào state
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lưu lỗi từ API vào state.error
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
