import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, AuthResponse } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Simulación de login - en un proyecto real esto sería una llamada HTTP
    return new Observable(observer => {
      setTimeout(() => {
        // Simular diferentes usuarios según el username
        let user: User;
        if (credentials.username === 'admin') {
          user = {
            id: 1,
            username: 'admin',
            email: 'admin@tienda.com',
            role: 'ADMINISTRADOR'
          };
        } else {
          user = {
            id: 2,
            username: credentials.username,
            email: `${credentials.username}@tienda.com`,
            role: 'CLIENTE'
          };
        }

        const response: AuthResponse = {
          user,
          token: 'fake-jwt-token-' + user.id
        };

        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', response.token);
        
        this.currentUserSubject.next(user);
        observer.next(response);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMINISTRADOR';
  }

  isCliente(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'CLIENTE';
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
