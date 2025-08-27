import axios from 'axios';
import { environment } from '../environment/environment';

const api = axios.create({ baseURL: environment.baseUrl });

api.interceptors.request.use((config) => {
  if (!config.headers) {
    (config as any).headers = {}; 
  }
  const h: any = config.headers;

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      if (typeof h.set === 'function') {
        h.set('x-auth-token', token);
      } else {
        h['x-auth-token'] = token;
      }
    }
  }

  const url = config.url ?? '';
  if (url && !url.startsWith('/api')) {
    config.url = `/api${url}`;
  }

  return config;
});

export default api;









