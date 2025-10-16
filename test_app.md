# Guía para Solucionar el Problema de Imágenes

## Problema Identificado
Las imágenes no se muestran correctamente en tu aplicación. Esto puede deberse a:

1. **URLs de imágenes incorrectas o nulas** en la base de datos
2. **Falta de configuración** para servir archivos estáticos
3. **Problemas de CORS** o acceso a recursos externos

## Soluciones Implementadas

### 1. Configuración de Archivos Estáticos
- ✅ Creado `FileController.java` para manejar imágenes estáticas
- ✅ Creado directorio `src/main/resources/static/images/`
- ✅ Configurado endpoint `/api/files/images/{filename}`

### 2. Inicializador de Datos
- ✅ Creado `DataInitializer.java` para poblar la BD con productos de ejemplo
- ✅ URLs de imágenes válidas usando Unsplash

### 3. Mejoras en el Frontend
- ✅ Agregado manejo de errores de imagen en `producto-card.component.ts`
- ✅ Implementado fallback a imagen placeholder
- ✅ Agregado `loading="lazy"` para optimización

## Cómo Probar

### 1. Reiniciar el Backend
```bash
cd tienda-backend
mvn spring-boot:run
```

### 2. Verificar Datos
Visita: `http://localhost:8080/api/productos/debug`
Esto mostrará en consola todos los productos con sus URLs de imagen.

### 3. Probar Frontend
```bash
cd tienda-frontend
ng serve
```

### 4. Verificar en el Navegador
- Abre `http://localhost:4200`
- Revisa la consola del navegador para errores
- Las imágenes deberían cargar correctamente

## URLs de Imágenes de Ejemplo
Los productos de ejemplo usan estas URLs:
- Laptop: `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop`
- Smartphone: `https://images.unsplash.com/photo-1511707171631-9ed0a9bea97e?w=400&h=300&fit=crop`
- Auriculares: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop`

## Si Aún No Funciona

### Verificar Base de Datos
1. Conecta a MySQL: `mysql -u root -p`
2. Usa la BD: `USE tiendaonline;`
3. Verifica datos: `SELECT id, nombre, imagen FROM productos;`

### Verificar CORS
Asegúrate de que el frontend esté en `http://localhost:4200` y el backend en `http://localhost:8080`

### Verificar Consola del Navegador
Revisa si hay errores de red o CORS en la consola del navegador.
