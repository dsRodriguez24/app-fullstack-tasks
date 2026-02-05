# 🚀 App Fullstack Tasks (Laravel 11 + React Vite)

Este proyecto es una aplicación fullstack completamente dockerizada, utilizando Laravel 11 para el backend, React/Vite para el frontend y PostgreSQL como base de datos.

## 📋 Requisitos Previos

- Docker Desktop instalado y en ejecución.
- Git para clonar el repositorio.

## 🛠️ Guía de Instalación y Despliegue

Sigue estos pasos en orden para levantar el entorno de desarrollo:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Configurar variables de entorno

Docker usará las variables definidas en el archivo `.env` de Laravel. Copia el ejemplo:

```bash
cp backend/.env.example backend/.env
```

Asegúrate de que las variables de DB en `backend/.env` coincidan con el `docker-compose.yml`:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### 3. Construir y levantar los contenedores

Este comando descargará las imágenes necesarias y compilará tus Dockerfiles.

```bash
docker-compose up -d --build
```

### 4. Instalación de dependencias y llaves

Una vez que los contenedores estén corriendo, debemos preparar Laravel:

```bash
# Instalar dependencias de PHP (si no se instalaron en el build)
docker-compose exec app composer install

# Generar la clave de la aplicación
docker-compose exec app php artisan key:generate

# Ejecutar migraciones y seeders
docker-compose exec app php artisan migrate --seed

# Ajustar permisos de storage (Crucial para Laravel 11)
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
```

## 🌐 Acceso a la Aplicación

Una vez finalizado el proceso, puedes acceder a:

- **Frontend (React/Vite):** [http://localhost:5173](http://localhost:5173) (con Hot Reload activado).
- **Backend API:** [http://localhost/api](http://localhost/api).
- **Base de Datos:** PostgreSQL en el puerto 5432 (host: `localhost`).

## 🛠️ Comandos Útiles

| Acción | Comando |
| :--- | :--- |
| Detener contenedores | `docker-compose down` |
| Ver logs en tiempo real | `docker-compose logs -f` |
| Acceder a la consola del backend | `docker-compose exec app bash` |
| Acceder a la consola del frontend | `docker-compose exec frontend sh` |
| Reiniciar un servicio específico | `docker-compose restart frontend` |

## ⚠️ Notas de Desarrollo

- **Hot Reload:** El frontend está configurado para detectar cambios en tiempo real gracias a los volúmenes de Docker. Si estás en Windows y no ves los cambios, asegúrate de tener `usePolling: true` en tu `vite.config.js`.
- **Nginx:** Actúa como proxy inverso. Cualquier petición que no sea PHP será manejada según la configuración en `backend/nginx/default.conf`.
