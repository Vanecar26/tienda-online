import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { CartItem } from '../model/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalItems = this.cartService.getTotalItems();
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  updateQuantity(itemId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const newQuantity = parseInt(target.value);
    
    if (newQuantity >= 0) {
      this.cartService.updateQuantity(itemId, newQuantity);
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    // Aquí se implementaría la lógica de checkout
    alert(`Procesando compra por $${this.totalPrice.toFixed(2)}`);
    this.cartService.clearCart();
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }
}
