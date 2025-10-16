package com.tienda.tienda_backend.repository;

import com.tienda.tienda_backend.entity.Producto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repositorio para la entidad Producto
 * Proporciona operaciones CRUD básicas y métodos de consulta personalizados
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /**
     * Busca productos por nombre (búsqueda exacta)
     * @param nombre el nombre del producto a buscar
     * @return Optional<Producto> el producto encontrado o vacío
     */
    Optional<Producto> findByNombre(String nombre);

    /**
     * Busca productos que contengan el texto especificado en el nombre (búsqueda parcial)
     * @param nombre el texto a buscar en el nombre
     * @return List<Producto> lista de productos que coinciden
     */
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    /**
     * Busca productos por rango de precio
     * @param precioMin precio mínimo
     * @param precioMax precio máximo
     * @return List<Producto> lista de productos en el rango de precio
     */
    List<Producto> findByPrecioBetween(Double precioMin, Double precioMax);

    /**
     * Busca productos con precio mayor al especificado
     * @param precio precio mínimo
     * @return List<Producto> lista de productos con precio mayor
     */
    List<Producto> findByPrecioGreaterThan(Double precio);

    /**
     * Busca productos con precio menor al especificado
     * @param precio precio máximo
     * @return List<Producto> lista de productos con precio menor
     */
    List<Producto> findByPrecioLessThan(Double precio);

    /**
     * Verifica si existe un producto con el nombre especificado
     * @param nombre el nombre del producto
     * @return boolean true si existe, false si no
     */
    boolean existsByNombre(String nombre);

    /**
     * Cuenta productos por rango de precio
     * @param precioMin precio mínimo
     * @param precioMax precio máximo
     * @return long número de productos en el rango
     */
    long countByPrecioBetween(Double precioMin, Double precioMax);

    /**
     * Busca productos con stock mayor al especificado
     * @param stock stock mínimo
     * @return List<Producto> lista de productos con stock mayor
     */
    List<Producto> findByStockGreaterThan(Integer stock);

    /**
     * Busca productos con stock menor al especificado
     * @param stock stock máximo
     * @return List<Producto> lista de productos con stock menor
     */
    List<Producto> findByStockLessThan(Integer stock);

    /**
     * Busca productos con stock igual a cero
     * @return List<Producto> lista de productos sin stock
     */
    List<Producto> findByStockEquals(Integer stock);

    /**
     * Busca productos por descripción que contenga el texto especificado
     * @param descripcion el texto a buscar en la descripción
     * @return List<Producto> lista de productos que coinciden
     */
    List<Producto> findByDescripcionContainingIgnoreCase(String descripcion);
}
