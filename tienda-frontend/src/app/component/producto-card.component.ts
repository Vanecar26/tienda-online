import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  @Output() eliminarProducto = new EventEmitter<number>();
  @Output() editarProducto = new EventEmitter<number>();
  @Output() verDetalle = new EventEmitter<Producto>();

  onImageError(event: any) {
    console.log('Error cargando imagen:', event);
    // Cambiar a imagen placeholder si falla la carga
    event.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
  }

  onEliminar() {
    if (this.producto.id) {
      this.eliminarProducto.emit(this.producto.id);
    }
  }

  /**
   * Emite el evento para editar el producto con el ID proporcionado
   * @emits EditarProducto con el ID del producto a editar
   */
  onEditar() {
    if (this.producto.id) {
      this.editarProducto.emit(this.producto.id);
    }
  }

  /**
   * Emite el evento para ver el detalle del producto
   * @emits VerDetalle
   */
  onVerDetalle() {
    this.verDetalle.emit(this.producto);
  }
}

