import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for standardized responses & error handling
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    if (error.message === 'Network Error' || !error.response) {
      message =
        'Cannot connect to backend server at http://localhost:5000. Please ensure backend is running.';
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
