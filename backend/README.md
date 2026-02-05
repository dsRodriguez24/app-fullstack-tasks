# App Fullstack Tasks - Backend API

Backend desarrollado en Laravel para la gestión de tareas con autenticación JWT.

## 🛠 Tecnologías

- **Framework:** Laravel 12
- **Lenguaje:** PHP 8.2+
- **Base de Datos:** SQLite (Configuración por defecto)
- **Autenticación:** JWT (tymon/jwt-auth)

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- [PHP](https://www.php.net/) >= 8.2
- [Composer](https://getcomposer.org/)
- [Git](https://git-scm.com/)

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. **Instalar dependencias de PHP:**
   ```bash
   composer install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo de ejemplo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Generar clave de aplicación:**
   ```bash
   php artisan key:generate
   ```

5. **Configurar Base de Datos (SQLite):**
   Abre el archivo `.env` y asegúrate de que la configuración de base de datos sea para SQLite (o configúrala para MySQL si prefieres).
   
   Para SQLite, crea el archivo de base de datos si no existe:
   ```bash
   # En Linux/Mac
   touch database/database.sqlite
   
   # En Windows Powershell
   New-Item -ItemType File database/database.sqlite
   ```

6. **Ejecutar migraciones:**
   ```bash
   php artisan migrate
   ```

7. **Generar secreto JWT:**
   Este paso es crucial para que funcione la autenticación:
   ```bash
   php artisan jwt:secret
   ```

8. **Levantar el servidor:**
   ```bash
   php artisan serve
   ```
   La API estará disponible en `http://localhost:8000`.

## 📡 Endpoints de la API

### Autenticación (Público)

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Registrar nuevo usuario | `{ "name": "...", "last_name": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/login` | Iniciar sesión | `{ "email": "...", "password": "..." }` |
| `POST` | `/api/refresh` | Refrescar token JWT (requiere cookie `refresh_token`) | - |

### Usuario (Privado - Requiere Token Bearer)

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/me` | Obtener datos del usuario actual | - |
| `PUT` | `/api/me` | Actualizar perfil | `{ "name": "...", "last_name": "..." }` |

### Tareas (Privado - Requiere Token Bearer)

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/task` | Listar tareas del usuario | - |
| `POST` | `/api/task` | Crear nueva tarea | `{ "title": "...", "description": "...", "status": "pending|in_progress|done", "completion_at": "YYYY-MM-DD" }` |
| `PUT` | `/api/task/{id}` | Actualizar tarea | *(Mismos campos que crear)* |

## 🧪 Tests

Para ejecutar las pruebas automatizadas:

```bash
php artisan test
```
