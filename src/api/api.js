import axios from 'axios';

const API_BASE_URL = 'https://your-backend-url.com/api'; // replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // include cookies if your backend requires auth cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for request/response
api.interceptors.request.use(
  (config) => {
    // You can attach auth token here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
