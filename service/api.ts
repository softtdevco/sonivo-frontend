import axios from "axios";
const baseURL = "https://sonivo-backend-production.up.railway.app/api/v1";




const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const codedToken = localStorage.getItem("access_token");
  const token = codedToken ? atob(codedToken) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  } else {
    // Remove Authorization header if token is not present
    delete config.headers.Authorization;
  }
  return config;
});

export default api;
