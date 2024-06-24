import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

console.log("Base URL:", baseURL); // Add this line to check

const api = axios.create({
  baseURL: baseURL,
});

export default api;
export { baseURL };
