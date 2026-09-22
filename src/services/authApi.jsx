import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = async (userData) => {
  return API.post("/auth/login", userData);
};