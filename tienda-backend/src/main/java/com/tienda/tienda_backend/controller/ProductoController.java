package com.tienda.tienda_backend.controller;

import com.tienda.tienda_backend.entity.Producto;
import com.tienda.tienda_backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para la gestión de productos
 * Proporciona endpoints para operaciones CRUD
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    /**
     * Obtiene todos los productos
     * GET /api/productos
     */
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = productoService.findAll();
        return ResponseEntity.ok(productos);
    }

    /**
     * Obtiene un producto por ID
     * GET /api/productos/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.findById(id);
        return producto.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un nuevo producto
     * POST /api/productos
     */
    @PostMapping
    public ResponseEntity<Producto> createProducto(@Valid @RequestBody Producto producto) {
        try {
            Producto nuevoProducto = productoService.save(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Actualiza un producto existente
     * PUT /api/productos/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, 
                                                  @Valid @RequestBody Producto productoActualizado) {
        Optional<Producto> producto = productoService.update(id, productoActualizado);
        return producto.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina un producto por ID
     * DELETE /api/productos/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        if (productoService.existsById(id)) {
            productoService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Busca productos por nombre (búsqueda exacta)
     * GET /api/productos/buscar?nombre={nombre}
     */
    @GetMapping("/buscar")
    public ResponseEntity<Producto> buscarPorNombre(@RequestParam String nombre) {
        Optional<Producto> producto = productoService.findByNombre(nombre);
        return producto.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Busca productos que contengan el texto especificado en el nombre
     * GET /api/productos/buscar-parcial?nombre={nombre}
     */
    @GetMapping("/buscar-parcial")
    public ResponseEntity<List<Producto>> buscarPorNombreParcial(@RequestParam String nombre) {
        List<Producto> productos = productoService.findByNombreContaining(nombre);
        return ResponseEntity.ok(productos);
    }

    /**
     * Busca productos por rango de precio
     * GET /api/productos/precio?min={precioMin}&max={precioMax}
     */
    @GetMapping("/precio")
    public ResponseEntity<List<Producto>> buscarPorRangoPrecio(@RequestParam Double min, 
                                                               @RequestParam Double max) {
        List<Producto> productos = productoService.findByPrecioBetween(min, max);
        return ResponseEntity.ok(productos);
    }

    /**
     * Obtiene el conteo total de productos
     * GET /api/productos/count
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        long count = productoService.count();
        return ResponseEntity.ok(count);
    }

    /**
     * Verifica si existe un producto por ID
     * GET /api/productos/{id}/exists
     */
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> existsById(@PathVariable Long id) {
        boolean exists = productoService.existsById(id);
        return ResponseEntity.ok(exists);
    }

    /**
     * Endpoint para debug - muestra todos los productos con sus imágenes
     * GET /api/productos/debug
     */
    @GetMapping("/debug")
    public ResponseEntity<List<Producto>> debugProductos() {
        List<Producto> productos = productoService.findAll();
        System.out.println("=== DEBUG PRODUCTOS ===");
        for (Producto p : productos) {
            System.out.println("ID: " + p.getId() + 
                             ", Nombre: " + p.getNombre() + 
                             ", Imagen: " + p.getImagen());
        }
        return ResponseEntity.ok(productos);
    }
}
