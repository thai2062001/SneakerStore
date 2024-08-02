import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchApiAll,
  createApi,
  updateApi,
  deleteApi,
} from "../../services/api";
import { path } from "../../utils/constants";
import axios from "axios";
import { decodeTokenId } from "../../utils/decodeToken";

const initialState = {
  cartItems: [],
  status: "idle",
  error: null,
  message: null,
};

export const fetchCartItems = createAsyncThunk(
  "cartItems/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchApiAll("cart-items");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartItemsByUserId = createAsyncThunk(
  "cartItems/fetchCartItemsByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access-token");
      const user_id = decodeTokenId(token).sub; // Assuming sub is the field for user_id

      const cartLink = `http://localhost:3000/cart/user/${user_id}`;
      const cartResponse = await axios.get(cartLink);
      const cart_id = cartResponse.data.cart_id;

      const cartItemsLink = `http://localhost:3000/cart-items/cart/${cart_id}`;
      const cartItemsResponse = await axios.get(cartItemsLink);
      const cartItems = cartItemsResponse.data;

      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCartItem = createAsyncThunk(
  "cartItems/createCartItem",
  async (createCartItemDto, { rejectWithValue, dispatch }) => {
    try {
      const response = await createApi(
        `${path.LOCAL}/${path.CART_ITEM_API}`,
        createCartItemDto
      );
      dispatch(setMessage("Cart item added successfully"));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cartItems/updateCartItem",
  async ({ id, updateCartItemDto }, { rejectWithValue }) => {
    try {
      const response = await updateApi(`cart-items/${id}`, updateCartItemDto);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cartItems/deleteCartItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteApi(`cart-items/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCartItemsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems.push(action.payload);
      })
      .addCase(createCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedItemId = action.payload.cartItem_id; // Giả sử action.payload chứa thông tin của item đã xóa
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItem_id !== deletedItemId
        );
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setMessage, clearMessage } = cartItemSlice.actions;

export default cartItemSlice.reducer;
