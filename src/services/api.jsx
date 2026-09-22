import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const reviewCodeAPI = async (code) => {
  try {

    const token = localStorage.getItem("token");

    const response = await API.post(
      "/ai/get-review",
      {
        code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.log(error);
    throw error;
  }
};