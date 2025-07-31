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

Esta aplicación es la interfaz de usuario para un Sistema de Inventario, diseñada con una arquitectura de microservicios que incluye un backend de lógica de negocio, un servicio de autenticación externo (Supabase) y un futuro módulo de IA. Las funcionalidades principales incluyen:

- Autenticación de usuarios (gestionada por Supabase).
- Autorización de usuarios (gestionada por el backend de lógica de negocio).
- Visualización de productos con paginación, filtros y búsqueda.
- Creación, Actualización y Eliminación (CRUD) de productos.
- Dashboard con estadísticas clave del inventario.

### Stack Tecnológico y Versiones

- **Node.js:** `(versión actual)`
- **pnpm:** `(versión actual)`
- **React:** `(versión actual)`
- **Vite:** `(versión actual)`
- **TypeScript:** `(versión actual)`

### Dependencias Clave

- `react`: Biblioteca principal para la UI.
- `react-dom`: Renderizado en el DOM.
- `react-router-dom`: Para el enrutamiento de la aplicación (ej. `/login`, `/dashboard`).
- `axios`: Cliente HTTP para las peticiones a la API del backend.
- `@fortawesome/fontawesome-free`: Librería de iconos.
- `@supabase/supabase-js`: Cliente JavaScript para interactuar con Supabase.

### Arquitectura y Escalabilidad Futura

La aplicación se construye siguiendo los principios de **Feature-Sliced Design (FSD)** para garantizar una alta cohesión y bajo acoplamiento. Esto nos permite tener una base de código modular y fácil de escalar.

La arquitectura del sistema se compone de tres servidores principales:

1.  **Frontend (este proyecto):** Interfaz de usuario construida con React, Vite y TypeScript.
2.  **Backend de Lógica de Negocio:** Servidor principal que maneja la lógica de negocio (CRUD de productos, etc.) y la autorización de usuarios.
3.  **Servidor MCP (Modelo de Control de Procesos):** Un servidor dedicado para la integración de la Inteligencia Artificial (IA FIRST). El frontend interactuará con el MCP para tareas de IA, y el MCP podrá interactuar con el backend de lógica de negocio para análisis más complejos.

La **autenticación** de usuarios se realiza a través de **Supabase**, mientras que la **autorización** es manejada por el backend de lógica de negocio. La gestión de estado global en el frontend se implementa con `useReducer` y `useContext`, preparada para esta arquitectura distribuida y la futura integración de IA.

### Endpoints del Backend

La aplicación interactúa con el backend de lógica de negocio a través de los siguientes endpoints. Las peticiones a estos endpoints incluyen un JWT obtenido de Supabase para la autorización.

**Autenticación (`/api/auth`)**

- `POST /login`: Endpoint para la autenticación de usuarios. (Nota: En la arquitectura final, la autenticación se realizará directamente con Supabase, pero este endpoint es relevante para entender el contrato de datos del backend).

**Productos (`/api/products`)**

- `GET /`: Obtener productos con paginación (`page`, `size`, `sortBy`, `sortDir`).
- `POST /`: Crear un nuevo producto.
- `PUT /{id}`: Actualizar un producto existente.
- `DELETE /{id}`: Eliminar un producto.

(Nota: Otros endpoints relacionados con productos como `/search`, `/low-stock`, `/categories`, `/brands`, `/patch/{id}/stock` no han sido implementados en el frontend aún, pero están disponibles en el backend).

### Guía de Inicio Rápido

1.  Clonar el repositorio: `git clone ...`
2.  Instalar dependencias: `pnpm install`
3.  Iniciar el servidor de desarrollo: `pnpm dev`
