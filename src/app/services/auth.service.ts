import { Injectable } from '@angular/core';
import api from './api-instance';

interface AuthResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  register(data: { name: string; email: string; password: string; }): Promise<any> {
    return new Promise((resolve, reject) => {
      api.post('/users/register', data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  }

  login(creds: { email: string; password: string; }): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      api.post<AuthResponse>('/users/login', creds)
        .then(res => {
          localStorage.setItem('token', res.data.token);
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }
  return !!localStorage.getItem('token');
}
}




