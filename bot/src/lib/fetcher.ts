import axios from "axios";
import * as logger from "./logger.js";

export const fetcher = axios.create({
  baseURL: process.env.BASE_URL ?? "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_SECRET}`,
  },
});

fetcher.interceptors.request.use((request) => {
  logger.debug(`${request.method?.toUpperCase()} ${request.url}`);
  return request;
});
