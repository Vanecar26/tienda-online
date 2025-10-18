import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Redirigir según el rol
        if (response.user.role === 'ADMINISTRADOR') {
          this.router.navigate(['/productos']);
        } else {
          this.router.navigate(['/productos']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
        console.error('Login error:', error);
      }
    });
  }

  loginAsAdmin(): void {
    this.username = 'admin';
    this.password = 'admin123';
    this.login();
  }

  loginAsClient(): void {
    this.username = 'cliente';
    this.password = 'cliente123';
    this.login();
  }
}
