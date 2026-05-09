# Checklist de Despliegue - Yorurei Studio Backend

## 1) Backend (Render / Railway)

- Plataforma sugerida: Render o Railway
- **Root directory**: `backend`
- **Build command**: `npm install && npx prisma generate`
- **Start command**: `npm run start`
- **Migrate command**: `npx prisma migrate deploy`
- **Health check**: `GET /api/health`

Variables de entorno:

- `DATABASE_URL`
- `FRONTEND_ORIGIN`
- `ADMIN_API_TOKEN`
- `PORT` (si la plataforma lo solicita)

## 2) Base de datos cloud (Supabase / Neon / Render Postgres)

- Crear instancia PostgreSQL.
- Copiar `DATABASE_URL` en formato SSL:
  - `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require`
- Configurar esa variable en el backend cloud.

## 3) Prisma en producción

1. Generar cliente Prisma en build.
2. Ejecutar `npx prisma migrate deploy` en entorno de producción.
3. Ejecutar `npm run prisma:seed` solo si necesitas datos iniciales.

## 4) Frontend (Cloudflare Pages)

- **Root directory**: `frontend`
- **Build command**: `npm run build`
- **Output directory**: `dist`

Variables de entorno (Cloudflare):

- `VITE_API_BASE_URL=https://URL-DEL-BACKEND`
- `VITE_SHOW_INTERNAL_ROUTES=false`

## 5) Verificaciones post-deploy

- `GET https://URL-DEL-BACKEND/api/health`
- `GET https://URL-DEL-BACKEND/api/services`
- `GET https://URL-DEL-BACKEND/api/projects`
- `GET https://URL-DEL-BACKEND/api/products`
- Probar envío del formulario público (`POST /api/contacts`).
- Verificar CORS con la URL real de Cloudflare Pages en `FRONTEND_ORIGIN`.

## 6) Seguridad mínima antes de abrir producción

- `ADMIN_API_TOKEN` largo y aleatorio.
- No usar `VITE_SHOW_INTERNAL_ROUTES=true` en producción.
- Revisar logs y rate limits.
- Planificar autenticación real para admin (JWT/sesiones y roles).
