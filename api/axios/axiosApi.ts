import axios from "axios";
import { getTokenSync } from "../secureStore";

export const axiosApi = axios.create({
  baseURL: "https://rpgbackend-1.onrender.com",
});

// ❗ теперь БЕЗ async
axiosApi.interceptors.request.use(
  (config) => {
    const token = getTokenSync();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);