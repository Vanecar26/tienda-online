import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/producto';
import { ProductoCardComponent } from './producto-card.component';
import { ProductoModalComponent } from './producto-modal/producto-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent, ProductoModalComponent],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  selectedProducto: Producto | null = null;
  isModalOpen: boolean = false;

  constructor(private productoService: ProductoService,
  private router: Router
  ) {}

  ngOnInit(): void {
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
}

