import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-producto-modal',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './producto-modal.html',
  styleUrls: ['./producto-modal.css']
})
export class ProductoModalComponent {
  @Input() producto: Producto | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder-image.png';
  }
}