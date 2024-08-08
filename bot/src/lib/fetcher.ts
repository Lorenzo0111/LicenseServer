import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.BASE_URL ?? "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_SECRET}`,
  },
});
