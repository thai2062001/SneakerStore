import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchApiAll,
  fetchApiById,
  createApi,
  updateApi,
  deleteApi,
} from "../../services/api";

import { path } from "../../utils/constants";

// Thunk để tạo thông báo mới
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await createApi(
        `${path.LOCAL}/${path.NOTIFICATION_API}`,
        notificationData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk để lấy tất cả các thông báo
// Xử lý lỗi trong fetchNotifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchApiAll(path.NOTIFICATION_API);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Fetch notifications failed:", error);
      return rejectWithValue(error.response?.data || error.message || error);
    }
  }
);

// Thunk để lấy thông báo theo ID
export const fetchNotificationById = createAsyncThunk(
  "notifications/fetchNotificationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchApiById(
        `${path.LOCAL}/${path.NOTIFICATION_API}/${id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk để cập nhật thông báo theo ID
export const updateNotification = createAsyncThunk(
  "notifications/updateNotification",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await updateApi(
        `${path.LOCAL}/${path.NOTIFICATION_API}/${id}`,
        updateData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk để cập nhật trạng thái đã đọc của thông báo theo ID
export const updateNotificationReadStatus = createAsyncThunk(
  "notifications/updateNotificationReadStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await updateApi(
        `${path.LOCAL}/${path.NOTIFICATION_API}/${id}`,
        { isRead: true }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk để xóa thông báo theo ID
export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      await deleteApi(`${path.NOTIFICATION_API}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNotificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        } else {
          state.notifications.push(action.payload);
        }
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateNotificationReadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotificationReadStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notification) => notification.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index].isRead = true;
        }
      })
      .addCase(updateNotificationReadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
