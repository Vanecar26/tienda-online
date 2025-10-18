import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../model/cart-item';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Cargar carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(producto: Producto, cantidad: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.producto.id === producto.id);

    if (existingItem) {
      // Si ya existe, aumentar la cantidad
      existingItem.cantidad += cantidad;
      existingItem.subtotal = existingItem.cantidad * existingItem.producto.precio;
    } else {
      // Si no existe, agregar nuevo item
      const newItem: CartItem = {
        id: Date.now(), // ID temporal
        producto: {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen
        },
        cantidad,
        subtotal: cantidad * producto.precio
      };
      currentItems.push(newItem);
    }

    this.cartItemsSubject.next([...currentItems]);
    this.saveCartToStorage();
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToStorage();
  }

  updateQuantity(itemId: number, cantidad: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.id === itemId);
    
    if (item) {
      if (cantidad <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.cantidad = cantidad;
        item.subtotal = item.cantidad * item.producto.precio;
        this.cartItemsSubject.next([...currentItems]);
        this.saveCartToStorage();
      }
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.cantidad, 0);
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.subtotal, 0);
  }

  isInCart(productoId: number): boolean {
    return this.cartItemsSubject.value.some(item => item.producto.id === productoId);
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }
}
