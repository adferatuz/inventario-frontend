# Sistema de Inventario - Frontend

Este proyecto es la interfaz de usuario moderna para el Sistema de Inventario, construida con React, Vite y TypeScript. Está diseñada desde cero para ser escalable, mantenible y preparada para la futura integración de un módulo de IA (IA FIRST).

## Tabla de Contenido

1.  [Descripción del Proyecto](#descripción-del-proyecto)
2.  [Stack Tecnológico y Versiones](#stack-tecnológico-y-versiones)
3.  [Dependencias Clave](#dependencias-clave)
4.  [Arquitectura y Escalabilidad Futura](#arquitectura-y-escalabilidad-futura)
5.  [Endpoints del Backend](#endpoints-del-backend)
6.  [Guía de Inicio Rápido](#guía-de-inicio-rápido)

---

### Descripción del Proyecto

Esta aplicación permite a los usuarios gestionar un inventario de productos. Las funcionalidades principales incluyen:

*   Autenticación de usuarios (Login).
*   Visualización de productos con paginación, filtros y búsqueda.
*   Creación, Actualización y Eliminación (CRUD) de productos.
*   Dashboard con estadísticas clave del inventario.

### Stack Tecnológico y Versiones

*   **Node.js:** `(versión actual)`
*   **pnpm:** `(versión actual)`
*   **React:** `(versión actual)`
*   **Vite:** `(versión actual)`
*   **TypeScript:** `(versión actual)`

### Dependencias Clave

*   `react`: Biblioteca principal para la UI.
*   `react-dom`: Renderizado en el DOM.
*   `react-router-dom`: Para el enrutamiento de la aplicación (ej. `/login`, `/dashboard`).
*   `axios`: Cliente HTTP para las peticiones a la API del backend.

### Arquitectura y Escalabilidad Futura

La aplicación se construye siguiendo los principios de **Feature-Sliced Design (FSD)** para garantizar una alta cohesión y bajo acoplamiento. Esto nos permite tener una base de código modular y fácil de escalar.

El plan de escalabilidad incluye la **integración de un módulo de IA (IA FIRST)** que permitirá a los usuarios interactuar con la aplicación a través de un chat, ejecutando acciones y realizando análisis de datos mediante lenguaje natural. La gestión de estado se implementará con `useReducer` y `useContext` para facilitar esta integración.

### Endpoints del Backend

La aplicación interactúa con el backend de Java Spring existente a través de los siguientes endpoints:

**Autenticación (`/api/auth`)**
*   `POST /login`: Iniciar sesión.
*   `GET /validate`: Validar token.

**Productos (`/api/products`)**
*   `GET /`: Obtener productos con paginación.
*   `GET /{id}`: Obtener un producto por su ID.
*   `POST /`: Crear un nuevo producto.
*   `PUT /{id}`: Actualizar un producto existente.
*   `DELETE /{id}`: Eliminar un producto.
*   `GET /search`: Buscar productos.
*   `GET /low-stock`: Obtener productos con bajo stock.
*   `GET /categories`: Obtener lista de categorías únicas.
*   `GET /brands`: Obtener lista de marcas únicas.
*   `PATCH /{id}/stock`: Actualizar el stock de un producto.

### Guía de Inicio Rápido

1.  Clonar el repositorio: `git clone ...`
2.  Instalar dependencias: `pnpm install`
3.  Iniciar el servidor de desarrollo: `pnpm dev`