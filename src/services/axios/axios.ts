import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.request.use(
  (config) => {
    // Example: attach token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // store.dispatch(setLoading(true));

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    // store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      console.warn("Unauthorized – maybe redirect to login.");
      // window.location.href = '/login';
    }

    // store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default instance;