import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-producto-list-view',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './producto-list-view.component.html',
  styleUrl: './producto-list-view.component.css'
})
export class ProductoListViewComponent {
  @Input() producto!: Producto;
  @Input() showAdminActions: boolean = false;
  @Input() isInCart: boolean = false;
  @Output() eliminarProducto = new EventEmitter<number>();
  @Output() editarProducto = new EventEmitter<number>();
  @Output() verDetalle = new EventEmitter<Producto>();
  @Output() addToCart = new EventEmitter<Producto>();
  @Output() removeFromCart = new EventEmitter<number>();

  onImageError(event: any) {
    console.log('Error cargando imagen:', event);
    event.target.src = 'https://via.placeholder.com/100x100?text=Sin+Imagen';
  }

  onEliminar() {
    if (this.producto.id) {
      this.eliminarProducto.emit(this.producto.id);
    }
  }

  onEditar() {
    if (this.producto.id) {
      this.editarProducto.emit(this.producto.id);
    }
  }

  onVerDetalle() {
    this.verDetalle.emit(this.producto);
  }

  onAddToCart() {
    this.addToCart.emit(this.producto);
  }

  onRemoveFromCart() {
    if (this.producto.id) {
      this.removeFromCart.emit(this.producto.id);
    }
  }
}
