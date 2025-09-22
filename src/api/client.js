import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      const token = parsed?.token || parsed?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {}
  return config;
});

export default api;


