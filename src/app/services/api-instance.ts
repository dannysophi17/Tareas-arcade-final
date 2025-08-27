import axios from 'axios';
import { environment } from '../environment/environment';

const api = axios.create({ baseURL: environment.baseUrl });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) (config.headers ??= {})['x-auth-token'] = token;
  }
  const url = config.url ?? '';
  if (url && !url.startsWith('/api')) config.url = `/api${url}`;
  return config;
});

export default api;







