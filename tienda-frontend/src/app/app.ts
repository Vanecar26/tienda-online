import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoggedIn: boolean = false;
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Suscribirse a cambios en el estado de autenticación
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = user !== null;
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
