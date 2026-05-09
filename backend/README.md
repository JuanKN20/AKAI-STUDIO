# Yorurei Studio Backend

API backend en Node.js + Express + Prisma para gestionar contenido de Yorurei Studio:

- proyectos
- servicios
- productos
- contactos

## Stack local

- Node.js 18+
- Docker Desktop (PostgreSQL local)
- Prisma ORM

## Variables de entorno

Usa `backend/.env.example` como plantilla:

```powershell
cd backend
Copy-Item .env.example .env
```

Variables requeridas:

- `DATABASE_URL`
- `DIRECT_URL`
- `FRONTEND_ORIGIN`
- `ADMIN_API_TOKEN`
- `PORT`

Nota CORS en producción:

- `FRONTEND_ORIGIN` acepta múltiples orígenes separados por coma.
- Ejemplo: `FRONTEND_ORIGIN=https://akai-studio.juann200213.workers.dev,http://localhost:5173,http://localhost:5174`

### Supabase + Prisma

- `DATABASE_URL`: conexión con pooling (PgBouncer), recomendada para runtime de la API.
- `DIRECT_URL`: conexión directa, usada por Prisma para migraciones/comandos de schema.
- En Render/Railway debes configurar **ambas** variables.
- Nunca subas contraseñas reales al repositorio.

## Flujo local recomendado (PowerShell)

1. Instalar dependencias:

```powershell
cd backend
npm install
```

2. Levantar PostgreSQL en Docker:

```powershell
npm run db:up
```

3. Generar Prisma Client:

```powershell
npx prisma generate
```

4. Crear/aplicar migraciones de desarrollo:

```powershell
npx prisma migrate dev --name init
```

5. Cargar seed:

```powershell
npm run prisma:seed
```

6. Levantar backend:

```powershell
npm run dev
```

7. Probar endpoints públicos:

- `http://localhost:3001/api/health`
- `http://localhost:3001/api/services`
- `http://localhost:3001/api/projects`
- `http://localhost:3001/api/products`

## Scripts útiles

- `npm run dev`
- `npm run start`
- `npm run db:up`
- `npm run db:down`
- `npm run db:logs`
- `npm run prisma:generate`
- `npm run prisma:migrate`
- `npm run prisma:deploy`
- `npm run prisma:seed`
- `npm run prisma:studio`
- `npm run db:reset`

## Endpoints públicos

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/contacts`

## Endpoints admin (x-admin-token)

- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `GET /api/admin/services`
- `POST /api/admin/services`
- `PUT /api/admin/services/:id`
- `DELETE /api/admin/services/:id`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`
- `GET /api/admin/contacts`
- `PUT /api/admin/contacts/:id/status`

Header requerido:

```http
x-admin-token: <ADMIN_API_TOKEN>
```

## Deploy backend (Render / Railway)

Configuración sugerida:

- Build command: `npm install && npx prisma generate`
- Start command: `npm run start`
- Post-deploy / migrate command: `npx prisma migrate deploy`

Variables de entorno requeridas:

- `DATABASE_URL`
- `DIRECT_URL`
- `FRONTEND_ORIGIN`
- `ADMIN_API_TOKEN`
- `PORT` (si la plataforma lo requiere)

Pasos sugeridos:

1. Crear la base de datos cloud (Supabase / Neon / Render Postgres).
2. Copiar `DATABASE_URL` (pooling) y `DIRECT_URL` (directa).
3. Crear el servicio backend con root directory `backend`.
4. Configurar variables de entorno del servicio.
5. Ejecutar migraciones con `npx prisma migrate deploy`.
6. Ejecutar seed si aplica (`npm run prisma:seed`).
7. Probar `GET /api/health`.
8. Actualizar frontend Cloudflare con `VITE_API_BASE_URL=https://URL-DEL-BACKEND`.

## SQL legacy

Prisma es la fuente principal de esquema/migraciones.

Los SQL previos se conservan como referencia en:

- `backend/sql-legacy/YorureiStudioDB.sql`
- `backend/sql-legacy/seed.sql`
