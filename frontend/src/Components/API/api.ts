import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/refresh', {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', response.data.accessToken);
          localStorage.setItem('refresh_token', response.data.refreshToken);
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token', err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
