import axios from "axios";
import { devBasicAuth } from "@/api/auth";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Replace with your backend's API base URL
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const routes = {
  test: '/',
  userTrunk: "/get_detailed_trunk?username=",
}

export function basicAuth() {
  apiClient.defaults.headers.Authorization = devBasicAuth();
}

export default apiClient;
