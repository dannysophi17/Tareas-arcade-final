import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.error = '';
    try {
      await this.auth.login({ email: this.email, password: this.password });
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.error = err.response?.data?.msg || 'Credenciales no válidas';
    }
  }
}




