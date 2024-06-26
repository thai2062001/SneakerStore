import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Các hàm gọi API khác
