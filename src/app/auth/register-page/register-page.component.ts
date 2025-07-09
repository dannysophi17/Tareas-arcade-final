import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  name = '';
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
      await this.auth.register({
        name: this.name,
        email: this.email,
        password: this.password
      });
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.error = err.response?.data?.msg || 'Error al registrar';
    }
  }
}


