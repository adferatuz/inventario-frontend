# Próximas Tareas - Mejoras de Rendimiento y Dashboard

**Objetivo:** Mejorar la eficiencia y la experiencia de usuario a través de la optimización de la carga de datos y la actualización de las métricas del dashboard.

*   **[ ] Búsquedas Indexadas de Productos en la Base de Datos:**
    *   **Contexto:** La búsqueda actual de productos puede ser lenta cuando hay una gran cantidad de registros.
    *   **Acción:** Investigar e implementar una estrategia de indexación en la base de datos para acelerar las consultas de búsqueda.

*   **[ ] Actualización de Métricas del Dashboard:**
    *   **Contexto:** Las métricas del dashboard (e.g., total de productos, valor del inventario) no se actualizan en tiempo real después de operaciones CRUD.
    *   **Acción:** Implementar un mecanismo para que las métricas del dashboard se actualicen automáticamente después de crear, actualizar o eliminar un producto.

*   **[ ] Implementación de Lazy Load para el Renderizado de Registros:**
    *   **Contexto:** La carga de una gran cantidad de productos en la tabla principal puede ralentizar la aplicación.
    *   **Acción:** Implementar "lazy loading" o "infinite scrolling" en la tabla de productos para cargar los datos por lotes a medida que el usuario se desplaza.