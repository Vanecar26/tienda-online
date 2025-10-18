import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../service/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  productoId: number | null = null;
  titulo = 'Crear Producto';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', [Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i)]]
    });

    // Verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productoId = +params['id'];
        this.titulo = 'Editar Producto';
        this.cargarProducto(this.productoId);
      }
    });
  }

  cargarProducto(id: number): void {
    this.productoService.getProducto(id).subscribe({
      next: (producto) => {
        this.productoForm.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen
        });
      },
      error: (error) => {
        console.error('Error al cargar producto:', error);
        alert(`Error al cargar el producto: ${error.message || 'Error desconocido'}`);
        this.router.navigate(['/productos']);
      }
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const productoData = this.productoForm.value;
      
      // Crear el objeto producto para enviar al backend
      const producto = {
        nombre: productoData.nombre,
        descripcion: productoData.descripcion || '',
        precio: productoData.precio,
        stock: productoData.stock,
        imagen: productoData.imagen || ''
      };

      if (this.isEditMode && this.productoId) {
        // Modo edición
        this.productoService.updateProducto(this.productoId, producto).subscribe({
          next: (response) => {
            console.log('Producto actualizado exitosamente:', response);
            alert('Producto actualizado exitosamente!');
            this.router.navigate(['/productos']);
          },
          error: (error) => {
            console.error('Error al actualizar producto:', error);
            alert(`Error al actualizar producto: ${error.message || 'Error desconocido'}`);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      } else {
        // Modo creación
        this.productoService.createProducto(producto).subscribe({
          next: (response) => {
            console.log('Producto creado exitosamente:', response);
            alert('Producto creado exitosamente!');
            this.productoForm.reset();
            this.router.navigate(['/productos']);
          },
          error: (error) => {
            console.error('Error al crear producto:', error);
            alert(`Error al crear producto: ${error.message || 'Error desconocido'}`);
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
      }
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productoForm.controls).forEach(key => {
      const control = this.productoForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.productoForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es obligatorio`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} no puede tener más de ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} debe ser mayor o igual a ${field.errors['min'].min}`;
      }
      if (field.errors['pattern']) {
        return `${this.getFieldLabel(fieldName)} debe ser una URL válida de imagen (jpg, jpeg, png, gif, webp)`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'nombre': 'El nombre',
      'descripcion': 'La descripción',
      'precio': 'El precio',
      'stock': 'El stock',
      'imagen': 'La URL de imagen'
    };
    return labels[fieldName] || fieldName;
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }
}
