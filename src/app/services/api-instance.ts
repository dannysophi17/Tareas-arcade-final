import axios from 'axios';
import { environment } from '../environment/environment';

const api = axios.create({
  baseURL: environment.baseUrl  
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!['x-auth-token'] = token; 
    }
  }
  return config;
});

export default api;






