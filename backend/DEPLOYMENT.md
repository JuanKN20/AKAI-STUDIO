# Checklist de Despliegue - Yorurei Studio Backend

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
- `PORT` (si la plataforma lo solicita)

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

Variables de entorno:

- `VITE_API_BASE_URL=https://URL-DEL-BACKEND`
- `VITE_SHOW_INTERNAL_ROUTES=false`

## 5) Verificaciones post-deploy

- `GET https://URL-DEL-BACKEND/api/health`
- `GET https://URL-DEL-BACKEND/api/services`
- `GET https://URL-DEL-BACKEND/api/projects`
- `GET https://URL-DEL-BACKEND/api/products`
- Probar envío del formulario público (`POST /api/contacts`).
- Verificar CORS: `FRONTEND_ORIGIN` debe coincidir exactamente con la URL de Cloudflare Pages.

## 6) Seguridad mínima

- `ADMIN_API_TOKEN` largo y aleatorio.
- No usar `VITE_SHOW_INTERNAL_ROUTES=true` en producción.
- Planificar auth real para admin (usuarios/sesiones/JWT y roles).
