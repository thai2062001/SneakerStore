import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.username; // Assumes the token has a `role_id` field
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};
const decodeTokenId = () => {
  const token = localStorage.getItem("access-token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken; // Assumes the token has a `role_id` field
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

export { decodeToken, decodeTokenId };
