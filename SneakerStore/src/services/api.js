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
export const fetchApiById = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const createApi = async (url, data) => {
  try {
    // Lấy access-token từ localStorage
    const token = localStorage.getItem("access-token");

    // Cấu hình headers cho yêu cầu POST
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Đảm bảo rằng yêu cầu gửi dưới dạng JSON
      },
    };

    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const updateApi = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteApi = async (POINT_END) => {
  try {
    const response = await axios.delete(`${path.LOCAL}/${POINT_END}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
