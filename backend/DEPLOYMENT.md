# Checklist de Despliegue - Yorurei Studio Backend

## URLs actuales

- Frontend publico (Cloudflare): `https://akai-studio.juann200213.workers.dev`
- Backend publico (Render): `https://yorurei-studio-backend1.onrender.com`

Nota: el dominio propio de Yorurei Studio sigue pendiente.

## 1) Backend (Render / Railway)

- Root directory: `backend`
- Build command: `npm install && npx prisma generate`
- Start command: `npm run start`
- Migrate command: `npx prisma migrate deploy`
- Health check: `GET /api/health`

Variables de entorno obligatorias:

- `DATABASE_URL`
- `DIRECT_URL`
- `FRONTEND_ORIGIN`
- `ADMIN_API_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET` (ejemplo: `yorurei-media`)
- `PORT` (si la plataforma lo solicita)

Nota CORS:

- `FRONTEND_ORIGIN` puede incluir múltiples URLs separadas por coma.
- Ejemplo: `FRONTEND_ORIGIN=https://akai-studio.juann200213.workers.dev,http://localhost:5173,http://localhost:5174`

## 2) Base de datos cloud (Supabase / Neon / Render Postgres)

Para Supabase:

- `DATABASE_URL`: usar URL de pooling (PgBouncer, normalmente puerto `6543`).
- `DIRECT_URL`: usar URL directa (normalmente puerto `5432`) para migraciones Prisma.

Ejemplo (sin credenciales reales):

```env
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-us-east-1.pooler.supabase.com:5432/postgres
```

Nunca subas contraseñas reales al repositorio.

## 3) Prisma en producción

1. `prisma generate` durante build.
2. `prisma migrate deploy` en deploy.
3. `prisma db seed` solo si necesitas datos iniciales.

## 4) Frontend (Cloudflare Pages)

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Confirmar fallback SPA:
  - `frontend/public/_redirects` con `/* /index.html 200`
  - o `frontend/wrangler.toml` con `not_found_handling = "single-page-application"`

Variables de entorno:

- `VITE_API_BASE_URL=https://yorurei-studio-backend1.onrender.com`
- `VITE_SHOW_INTERNAL_ROUTES=false`

## 5) Verificaciones post-deploy

- `GET https://yorurei-studio-backend1.onrender.com/api/health`
- `GET https://yorurei-studio-backend1.onrender.com/api/services`
- `GET https://yorurei-studio-backend1.onrender.com/api/projects`
- `GET https://yorurei-studio-backend1.onrender.com/api/products`
- Probar envío del formulario público (`POST /api/contacts`).
- Verificar CORS: `FRONTEND_ORIGIN` debe coincidir exactamente con la URL de Cloudflare Pages.

## 6) Seguridad mínima

- `ADMIN_API_TOKEN` largo y aleatorio.
- `SUPABASE_SERVICE_ROLE_KEY` solo en backend (nunca en frontend).
- No usar `VITE_SHOW_INTERNAL_ROUTES=true` en producción.
- Planificar auth real para admin (usuarios/sesiones/JWT y roles).

## 7) Storage de imagenes (paso manual en Supabase)

1. Crear bucket `yorurei-media` en Supabase Storage.
2. Marcar el bucket como publico para exponer URLs de imagen.
3. Configurar en Render:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_STORAGE_BUCKET=yorurei-media`
4. Manual Deploy -> Deploy latest commit.


