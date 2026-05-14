# Yorurei Studio

Repositorio principal de Yorurei Studio con separacion profesional de frontend y backend.

## URLs actuales

- Frontend publico (Cloudflare): `https://akai-studio.juann200213.workers.dev`
- Backend publico (Render): `https://yorurei-studio-backend1.onrender.com`

Nota: el dominio propio de Yorurei Studio sigue pendiente. Mientras tanto se usa la URL real de Cloudflare.

## Estructura

- `frontend/`: aplicacion web React + Vite + Tailwind desplegable en Cloudflare.
- `backend/`: API local con Node.js/Express y PostgreSQL para endpoints de soporte (por ejemplo `/api/usuarios`).

## Frontend

```powershell
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

## Backend (local)

```powershell
cd backend
npm install
npm run dev
```

## Cloudflare

Si el proyecto ya estaba conectado con carpeta raiz del repositorio actual, actualiza el **Root directory** a `frontend`.
El comando de build sigue siendo `npm run build` y el output directory sigue siendo `dist`.

Checklist final Cloudflare:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Variable: `VITE_API_BASE_URL=https://yorurei-studio-backend1.onrender.com`
- Variable: `VITE_SHOW_INTERNAL_ROUTES=false`
- En `frontend/public/_redirects` debe existir: `/* /index.html 200` para soportar rutas SPA al recargar.

## Render

Checklist final Render (backend):

- Root directory: `backend`
- Build command: `npm install && npx prisma generate`
- Start command: `npm run start`
- Post deploy: `npx prisma migrate deploy`
- Variables: `DATABASE_URL`, `DIRECT_URL`, `FRONTEND_ORIGIN`, `ADMIN_API_TOKEN`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`
- Health check: `GET https://yorurei-studio-backend1.onrender.com/api/health`

## Pendientes Tecnicos de Marca

- La carpeta raiz puede mantenerse como `AKAI-STUDIO` temporalmente para evitar impactos en rutas locales.
- El `name` de `frontend/wrangler.toml` se mantiene por ahora para no afectar despliegues existentes.
- Nombres internos `akai-*` en configuraciones/CSS pueden limpiarse despues sin impacto visual inmediato.
