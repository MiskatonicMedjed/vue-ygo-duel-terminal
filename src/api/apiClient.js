import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Replace with your backend's API base URL
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export function setBasicAuth(username, password) {
  const token = btoa(`${username}:${password}`); // Encode username and password
  apiClient.defaults.headers.Authorization = `Basic ${token}`;
}

export function devBasicAuth() {
  const token = btoa(
    `${process.env.AUTH_USERNAME}:${process.env.AUTH_PASSWORD}`
  );
  apiClient.defaults.headers.Authorization = `Basic ${token}`;
}

export function clearAuth() {
  delete apiClient.defaults.headers.Authorization;
}

export default apiClient;
