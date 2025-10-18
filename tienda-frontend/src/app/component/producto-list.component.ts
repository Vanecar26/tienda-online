import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/producto';
import { ProductoCardComponent } from './producto-card.component';
import { ProductoListViewComponent } from './producto-list-view.component';
import { ProductoModalComponent } from './producto-modal/producto-modal';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent, ProductoListViewComponent, ProductoModalComponent],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  selectedProducto: Producto | null = null;
  isModalOpen: boolean = false;
  viewMode: 'grid' | 'list' = 'grid';
  isAdmin: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private productoService: ProductoService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Verificar rol de administrador
    this.isAdmin = this.authService.isAdmin();

    // Suscribirse a cambios en el carrito
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItems();
    });

    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error(error);
        alert(`Ha ocurrido un error: ${error}`);
      }
    });
  }
  agregarProducto() {
    this.router.navigate(['/productos/new']);
  }

  onEliminar(productoId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productoService.deleteProducto(productoId).subscribe({
        next: () => {
          // Eliminar el producto de la lista local
          this.productos = this.productos.filter(p => p.id !== productoId);
          alert('Producto eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          alert(`Error al eliminar el producto: ${error.message || error}`);
        }
      });
    }
  }

  onEditar(productoId: number) {
    // Navegar a la página de edición con el ID del producto
    this.router.navigate(['/productos/edit', productoId]);
  }

  onVerDetalle(producto: Producto) {
    this.selectedProducto = producto;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedProducto = null;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  onAddToCart(producto: Producto) {
    this.cartService.addToCart(producto);
  }

  onRemoveFromCart(productoId: number) {
    const cartItems = this.cartService.getCartItems();
    const item = cartItems.find(item => item.producto.id === productoId);
    if (item) {
      this.cartService.removeFromCart(item.id);
    }
  }

  isInCart(productoId: number): boolean {
    return this.cartService.isInCart(productoId);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

