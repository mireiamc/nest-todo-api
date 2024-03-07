# API de Gestión de Tareas

Esta API proporciona funcionalidades para la gestión de tareas, incluyendo la creación de nuevas tareas, obtención de listados de tareas, marcado de tareas como completadas y obtención de historial de tareas.

## Características Destacadas

- **Swagger UI**: La API incluye documentación interactiva generada automáticamente con Swagger, lo que facilita la comprensión de los endpoints disponibles y sus parámetros. Se encuentra en la ruta `/api` en el puerto 3000 por defecto.
- **Validaciones de Entrada**: Se han implementado validaciones de entrada para garantizar la integridad de los datos recibidos en las solicitudes HTTP. Para ello se ha utilizado la pipe `ValidationPipe` que a su vez utiliza la libreria de `class-validator`.
- **Uso de DTOs**: Se utilizan DTOs (Objetos de Transferencia de Datos) para definir la estructura de los datos que se envían y reciben en la API, lo que facilita la validación y el procesamiento de los datos.
- **Capa de Seguridad**: Se ha añadido una capa de seguridad utilizando un token para autenticar que los usuarios tienen permiso para acceder a la información. Para generar este token, se ha añadido el endpoint `/auth/login`.

## Puntos de mejora

- Añadir tests para controladores y servicios.
- Añadir funcionalidad extra, por ejemplo, asociar tareas a usuarios.

## Cómo arrancar el proyecto

1. **Instalación de dependencias**: Ejecuta el siguiente comando para instalar las dependencias necesarias:
`npm install`

2. **Arrancar el servidor**: Ejecuta el siguiente comando para arrancar el servidor de desarrollo:
`npm run start`
Esto iniciará el servidor en el puerto 3000 por defecto. Durante el desarrollo de la prueba, se ha utilizado `npm run start:dev` para que el servidor se actualizara con cada cambio en el código.

3. **Acceder a la UI de Swagger**: Accede a `localhost:3000/api` en tu navegador.

4. **Autenticar usuario**: Utiliza alguno de los usuarios de prueba existentes en `users.service.ts`, por ejemplo, username `maria` y password `guess`, para recibir el token utilizando el endpoint `/auth/login`. Copia el token devuelto en `access_token`. Haz click en el botón `Authorize` e introduce el token en el formulario. Por último, haz click en `Authroize` y `Close`.

5. **Utilizar el gestor de tareas**: El servicio `tasks.service.ts` incluye algunas tareas por defecto. A continuación encontraréis los diferentes endpoints disponibles.

## Endpoints

- **Crear una nueva tarea**
  - Método HTTP: POST
  - Ruta: `/tasks`
  - Descripción: Crea una nueva tarea.
  - Cuerpo de la Solicitud: Objeto CreateTaskDto
  - Respuestas:
    - 200 OK: Tarea creada con éxito.
    - 400 Bad Request: Fallo en la validación de entrada.
    - 401 Unauthorized: Usuario no autorizado.

- **Obtener todas las tareas**
  - Método HTTP: GET
  - Ruta: `/tasks`
  - Descripción: Obtiene un listado de todas las tareas.
  - Respuestas:
    - 200 OK: Listado de tareas devuelto con éxito.
    - 401 Unauthorized: Usuario no autorizado.

- **Obtener historial de tareas completadas**
  - Método HTTP: GET
  - Ruta: `/tasks/history`
  - Descripción: Obtiene un listado de todas las tareas completadas.
  - Respuestas:
    - 200 OK: Histórico de tareas devuelto con éxito.
    - 401 Unauthorized: Usuario no autorizado.

- **Obtener una tarea por ID**
  - Método HTTP: GET
  - Ruta: `/tasks/{taskId}`
  - Descripción: Obtiene una tarea específica por su ID.
  - Parámetros de Ruta:
    - `taskId` (number): ID de la tarea
  - Respuestas:
    - 200 OK: Tarea encontrada con éxito.
    - 404 Not Found: Tarea no encontrada.
    - 400 Bad Request: Fallo en la validación de entrada.
    - 401 Unauthorized: Usuario no autorizado.

- **Marcar una tarea como completada**
  - Método HTTP: POST
  - Ruta: `/tasks/{taskId}/complete`
  - Descripción: Marca una tarea específica como completada.
  - Parámetros de Ruta:
    - `taskId` (number): ID de la tarea
  - Respuestas:
    - 200 OK: Tarea actualizada con éxito.
    - 404 Not Found: Tarea no encontrada.
    - 400 Bad Request: Fallo en la validación de entrada.
    - 401 Unauthorized: Usuario no autorizado.

- **Autenticar usuario**
  - Método HTTP: POST
  - Ruta: `/auth/login`
  - Descripción: Autentica al usuario con usuario y contraseña.
  - Respuestas:
    - 200 OK: Tarea actualizada con éxito.
    - 404 Not Found: Tarea no encontrada.
    - 400 Bad Request: Fallo en la validación de entrada.
    - 401 Unauthorized: Usuario no autorizado.

## Nest Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Nest License

Nest is [MIT licensed](LICENSE).
