import axios from 'axios';
import { environment } from '../environment/environment';

const api = axios.create({ baseURL: environment.baseUrl });

api.interceptors.request.use((config) => {
  const headers = (config.headers ?? {}) as Record<string, string>;

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['x-auth-token'] = token;
    }
  }

  config.headers = headers;

  const url = config.url ?? '';
  if (url && !url.startsWith('/api')) {
    config.url = `/api${url}`;
  }

  return config;
});

export default api;








