import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://collaborative-document-annotation-system.onrender.com/api",
});
