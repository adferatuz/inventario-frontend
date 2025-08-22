# Próximas Tareas - Funcionalidades para el Rol USER

**Objetivo:** Desarrollar las funcionalidades específicas para el rol de "USER", permitiéndole interactuar con los datos de productos de forma controlada.

*   **[ ] Creación de Features para el Rol USER:**
    *   **Contexto:** Actualmente, la aplicación no distingue entre diferentes roles de usuario. Se necesita una vista específica para el rol "USER".
    *   **Acción:**
        *   **[ ]** Diseñar y desarrollar una interfaz de usuario para que los usuarios con rol "USER" puedan visualizar los productos.
        *   **[ ]** Implementar la lógica para realizar peticiones GET de productos de forma paginada.
        *   **[ ]** Implementar búsquedas indexadas con diferentes filtros (e.g., por nombre, categoría, marca). Los filtros exactos serán definidos por el equipo de desarrollo.
        *   **[ ]** Asegurar que los usuarios con rol "USER" solo tengan permisos de lectura (GET) y no puedan realizar operaciones de escritura (POST, PUT, DELETE).