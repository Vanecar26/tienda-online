package com.tienda.tienda_backend.service;

import com.tienda.tienda_backend.entity.Producto;
import com.tienda.tienda_backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio para la gestión de productos
 * Proporciona operaciones de negocio para la entidad Producto
 */
@Service
@Transactional
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    /**
     * Obtiene todos los productos
     * @return List<Producto> lista de todos los productos
     */
    @Transactional(readOnly = true)
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    /**
     * Busca un producto por su ID
     * @param id el ID del producto a buscar
     * @return Optional<Producto> el producto encontrado o vacío
     */
    @Transactional(readOnly = true)
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    /**
     * Guarda un producto (crear o actualizar)
     * @param producto el producto a guardar
     * @return Producto el producto guardado
     */
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    /**
     * Elimina un producto por su ID
     * @param id el ID del producto a eliminar
     */
    public void deleteById(Long id) {
        productoRepository.deleteById(id);
    }

    /**
     * Verifica si existe un producto con el ID especificado
     * @param id el ID del producto
     * @return boolean true si existe, false si no
     */
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return productoRepository.existsById(id);
    }

    /**
     * Cuenta el total de productos
     * @return long número total de productos
     */
    @Transactional(readOnly = true)
    public long count() {
        return productoRepository.count();
    }

    /**
     * Busca productos por nombre (búsqueda exacta)
     * @param nombre el nombre del producto
     * @return Optional<Producto> el producto encontrado o vacío
     */
    @Transactional(readOnly = true)
    public Optional<Producto> findByNombre(String nombre) {
        return productoRepository.findByNombre(nombre);
    }

    /**
     * Busca productos que contengan el texto especificado en el nombre
     * @param nombre el texto a buscar en el nombre
     * @return List<Producto> lista de productos que coinciden
     */
    @Transactional(readOnly = true)
    public List<Producto> findByNombreContaining(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    /**
     * Busca productos por rango de precio
     * @param precioMin precio mínimo
     * @param precioMax precio máximo
     * @return List<Producto> lista de productos en el rango de precio
     */
    @Transactional(readOnly = true)
    public List<Producto> findByPrecioBetween(Double precioMin, Double precioMax) {
        return productoRepository.findByPrecioBetween(precioMin, precioMax);
    }

    /**
     * Actualiza un producto existente
     * @param id el ID del producto a actualizar
     * @param productoActualizado el producto con los nuevos datos
     * @return Optional<Producto> el producto actualizado o vacío si no existe
     */
    public Optional<Producto> update(Long id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(productoExistente -> {
                    productoExistente.setNombre(productoActualizado.getNombre());
                    productoExistente.setDescripcion(productoActualizado.getDescripcion());
                    productoExistente.setPrecio(productoActualizado.getPrecio());
                    productoExistente.setStock(productoActualizado.getStock());
                    productoExistente.setImagen(productoActualizado.getImagen());
                    return productoRepository.save(productoExistente);
                });
    }
}
