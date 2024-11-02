import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 422) {
      console.error('Validation error details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Add this to handle trailing slashes consistently
api.interceptors.request.use(config => {
  if (config.url && !config.url.endsWith('/')) {
    config.url += '/';
  }
  return config;
});