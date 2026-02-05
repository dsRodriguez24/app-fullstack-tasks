# Proyecto: app-fullstack-tasks (Docker)

Este repositorio contiene un proyecto fullstack con backend Laravel y frontend (Vite/React). Aquí están las instrucciones para dockerizar, ejecutar con PostgreSQL y subir a GitHub.

Requisitos
- Docker y Docker Compose instalados en tu máquina.
- Git instalado para subir a GitHub.

Archivos añadidos
- `docker-compose.yml` (orquesta servicios: app, web (nginx), db (postgres), frontend)
- `backend/Dockerfile` (imagen PHP-FPM con pdo_pgsql y composer)
- `backend/nginx/default.conf` (configuración nginx para Laravel)
- `frontend/Dockerfile` (imagen Node para Vite)
- `.dockerignore` y `.gitignore`

Configuración de entorno (Laravel)
1. Copia el archivo de entorno existente o crea uno: `backend/.env` (no lo subas a GitHub).
2. Ajusta las variables de la base de datos en `backend/.env` (o crea/edítalas) así:

```
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

Levantar el proyecto con Docker
1. Desde la raíz del repositorio ejecuta (con privilegios suficientes):

```bash
docker-compose up -d --build
```

2. Comprobar contenedores:

```bash
docker-compose ps
```

3. Ejecutar migraciones y seeders (si aplica):

```bash
docker-compose exec app php artisan migrate --seed --force
```

4. (Opcional) Generar key de Laravel si no existe:

```bash
docker-compose exec app php artisan key:generate
```

Frontend
- El servidor de desarrollo Vite estará expuesto en el puerto `5173`. Para desarrollo en caliente, abre `http://localhost:5173`.
- Para construir una versión de producción desde el contenedor:

```bash
docker-compose exec frontend npm run build
```

Notas y recomendaciones
- Si tu Laravel usa colas, cache o Redis, añade un servicio adicional en `docker-compose.yml` y actualiza `.env`.
- Asegúrate de que los permisos de `storage` y `bootstrap/cache` permiten escritura por el usuario del contenedor (ya se intenta ajustar en el Dockerfile).
- Si tienes archivos locales que no quieres que sobrescriban lo que hay en el contenedor, ajusta los `volumes` en `docker-compose.yml`.

Subir el proyecto a GitHub (pasos básicos)
1. Inicializar repo local (si no existe):

```bash
git init
git add .
git commit -m "Initial commit: Dockerized project"
```

2. Crear un repositorio en GitHub (en la web) y luego conectar remoto y pushear:

```bash
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git branch -M main
git push -u origin main
```

Próximos pasos sugeridos
- Probar `docker-compose up -d --build` y compartir cualquier error que aparezca.
- Si quieres, puedo:
  - Ajustar la configuración para producción (TLS, dominios, certificados),
  - Añadir servicios como Redis/Queue/Meilisearch,
  - Crear un workflow de GitHub Actions para build y push de imágenes.

Contacto
- Si necesitas que ejecute la subida a GitHub desde aquí, indícame el nombre del repo y si quieres que cree el remote automáticamente.
