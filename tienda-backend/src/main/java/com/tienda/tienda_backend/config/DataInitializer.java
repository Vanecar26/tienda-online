package com.tienda.tienda_backend.config;

import com.tienda.tienda_backend.entity.Producto;
import com.tienda.tienda_backend.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos para poblar la base de datos con productos de ejemplo
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductoService productoService;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existen productos
        if (productoService.count() == 0) {
            System.out.println("Inicializando datos de ejemplo...");
            
            // Crear productos de ejemplo con URLs de imágenes
            Producto producto1 = new Producto(
                "Laptop Gaming",
                "Laptop de alto rendimiento para gaming y trabajo",
                1299.99,
                15,
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
            );

            Producto producto2 = new Producto(
                "Smartphone Samsung",
                "Teléfono inteligente con cámara de 64MP",
                699.99,
                25,
                "https://images.unsplash.com/photo-1511707171631-9ed0a9bea97e?w=400&h=300&fit=crop"
            );

            Producto producto3 = new Producto(
                "Auriculares Bluetooth",
                "Auriculares inalámbricos con cancelación de ruido",
                199.99,
                30,
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
            );

            Producto producto4 = new Producto(
                "Tablet iPad",
                "Tablet Apple con pantalla Retina de 10.9 pulgadas",
                449.99,
                12,
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
            );

            Producto producto5 = new Producto(
                "Smartwatch",
                "Reloj inteligente con monitoreo de salud",
                299.99,
                20,
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
            );

            // Guardar productos
            productoService.save(producto1);
            productoService.save(producto2);
            productoService.save(producto3);
            productoService.save(producto4);
            productoService.save(producto5);

            System.out.println("Datos de ejemplo creados exitosamente!");
        } else {
            System.out.println("La base de datos ya contiene productos. Saltando inicialización.");
        }
    }
}
