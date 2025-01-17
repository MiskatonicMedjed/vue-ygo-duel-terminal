import apiClient from "@/api/apiClient";

export function setBasicAuth(username, password) {
  const token = btoa(`${username}:${password}`); // Encode username and password
  apiClient.defaults.headers.Authorization = `Basic ${token}`;
}

export function devBasicAuth() {
  const token = btoa(
    `${process.env.VUE_APP_AUTH_USERNAME}:${process.env.VUE_APP_AUTH_PASSWORD}`
  );
  return `Basic ${token}`;
}

export function clearAuth() {
  delete apiClient.defaults.headers.Authorization;
}