import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 

  constructor(private router: Router) {}

  changeView() {
    // Obtener la ruta actual
    const currentUrl = this.router.url;
    
    if (currentUrl === '/productos' || currentUrl === '/') {
      // Si estamos en la lista, ir al formulario
      this.router.navigate(['/productos/new']);
    } else {
      // Si estamos en el formulario, ir a la lista
      this.router.navigate(['/productos']);
    }
  }

  get isListRoute(): boolean {
    return this.router.url === '/productos' || this.router.url === '/';
  }
}
