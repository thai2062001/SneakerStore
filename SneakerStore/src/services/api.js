// src/api.js
import axios from "axios";
import { path } from "../utils/constants";

export const fetchApiAll = async (POINT_END) => {
  const token = localStorage.getItem("access-token");

  try {
    const response = await axios.get(`${path.LOCAL}/${POINT_END}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Các hàm gọi API khác nếu có
