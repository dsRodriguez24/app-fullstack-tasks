# Taskware (Frontend)

Frontend de la aplicación de gestión de tareas construida con React, Vite y Material UI.

**Requisitos**
- Node.js 18+ y un gestor de paquetes (npm/npm/yarn).
- Recomendado: `npm` (el repo contiene `npm-lock.yaml`).

**Instalación**

```bash
npm install
npm dev
```

**Scripts útiles** (ver `package.json`):
- `npm dev`: servidor de desarrollo (Vite).
- `npm build`: Type-check (`tsc -b`) y compilación de producción (Vite).
- `npm preview`: previsualizar build de producción.
- `npm lint` / `npm lint:fix`: ejecutar ESLint y arreglar problemas.
- `npm deploy`: publicar en GitHub Pages (usa `gh-pages`).

**Estructura rápida**
- `src/main.tsx` — entrada principal.
- `src/routes` — definición de rutas y `RequireAuth`.
- `src/layouts` — layouts principales (auth, main).
- `src/pages` — páginas (SignIn, SignUp, Dashboard, Profile, etc.).
- `src/components` — componentes reutilizables y secciones.
- `src/store` — Redux Toolkit slices, store y hooks tipados.
- `src/api` — llamados a la API y configuración de axios.
- `src/helpers` — utilidades (toasts, validadores, helpers).

**Notas importantes & recomendaciones**
- Tipado: usar `useAppDispatch` y `useAppSelector` desde `src/store/hooks.ts` para evitar `any` y mejorar inferencia TS.
- Navegación: usar `react-router` `Link` / `RouterLink` para navegación SPA (evitar `href` en MUI Link que recarga la página).
- Formularios: considerar `react-hook-form` + `zod`/`yup` para validaciones declarativas.
- Toasts: si SweetAlert2 queda detrás de overlays, añadir CSS global `.swal2-container { z-index: 14000 !important; }` en lugar de manipular el DOM.
- API: centralizar refresh token y reintentos con interceptors de axios para manejar 401 automáticamente.
- Calidad: configurar y usar ESLint + Prettier; añadir pruebas con Vitest + React Testing Library.
