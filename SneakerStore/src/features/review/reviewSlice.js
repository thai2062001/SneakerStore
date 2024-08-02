// src/store/reviewSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchApiAll, fetchApiById } from "../../services/api";
import { path } from "../../utils/constants";
import { notification } from "antd";

// Trạng thái ban đầu của Review
const initialState = {
  reviews: [],
  review: null,
  status: "idle",
  error: null,
};

// Tạo async thunk để gọi API tạo review
export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const data = await createApi(
        `${path.LOCAL}/${path.REVIEW_API}`,
        reviewData
      );
      notification.success({
        message: "Success",
        description: "Review created successfully",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsByProductId = createAsyncThunk(
  "reviews/fetchReviewsByProductId",
  async (productId) => {
    try {
      const response = await fetchApiAll(
        `${path.REVIEW_API}/product/${productId}`
      );
      return response;
    } catch (error) {
      throw Error("Failed to fetch reviews by product ID: " + error.message);
    }
  }
);

// Tạo async thunk để gọi API cập nhật review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const data = await createApi(
        `${path.LOCAL}/${path.REVIEW_API}/${id}`,
        reviewData,
        "PATCH"
      );
      notification.success({
        message: "Success",
        description: "Review updated successfully",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tạo async thunk để gọi API xóa review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await createApi(`${path.LOCAL}/${path.REVIEW_API}/${id}`, null, "DELETE");
      notification.success({
        message: "Success",
        description: "Review deleted successfully",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tạo async thunk để gọi API lấy tất cả reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    try {
      const data = await fetchApiAll(path.REVIEW_API);
      console.log(data);
      return data;
    } catch (error) {
      throw Error("Failed to fetch reviews: " + error.message);
    }
  }
);

// Tạo async thunk để gọi API lấy review theo ID
export const fetchReviewById = createAsyncThunk(
  "reviews/fetchReviewById",
  async (id) => {
    try {
      const data = await fetchApiById(`${path.LOCAL}/${path.REVIEW_API}/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      throw Error("Failed to fetch review: " + error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReviewById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.review = action.payload;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setReview } = reviewSlice.actions;

export default reviewSlice.reducer;
