import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8080/api/productos');
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`http://localhost:8080/api/productos/${id}`);
  }

  createProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
    return this.http.post<Producto>('http://localhost:8080/api/productos', producto);
  }

  updateProducto(id: number, producto: Omit<Producto, 'id'>): Observable<Producto> {
    return this.http.put<Producto>(`http://localhost:8080/api/productos/${id}`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/productos/${id}`);
  }
}
