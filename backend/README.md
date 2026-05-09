# Yorurei Studio Backend

API backend en Node.js + Express + Prisma para gestionar contenido dinamico de Yorurei Studio:

- proyectos
- servicios
- productos
- contactos

## Stack local de esta fase

- Node.js 18+
- Docker Desktop (PostgreSQL en contenedor)
- Prisma ORM

## Variables de entorno

Usa `backend/.env.example` como referencia y crea/ajusta `backend/.env`:

```powershell
cd backend
Copy-Item .env.example .env
```

Variables principales:

- `PORT=3001`
- `DATABASE_URL=postgresql://yorurei:yorurei_local_2026@localhost:5433/yorurei_studio?schema=public`
- `FRONTEND_ORIGIN=http://localhost:5173`
- `ADMIN_API_TOKEN=change_me_in_local`

## Flujo recomendado (PowerShell)

1. Instalar dependencias:

```powershell
cd backend
npm install
```

2. Levantar PostgreSQL en Docker:

```powershell
npm run db:up
```

Con este `docker-compose.yml`, Docker Desktop mostrara el proyecto como `yorurei-studio`.

3. Generar Prisma Client:

```powershell
npx prisma generate
```

4. Crear/aplicar migracion inicial:

```powershell
npx prisma migrate dev --name init
```

5. Cargar seed inicial:

```powershell
npm run prisma:seed
```

6. Levantar backend:

```powershell
npm run dev
```

7. Probar endpoints publicos:

- `http://localhost:3001/api/health`
- `http://localhost:3001/api/services`
- `http://localhost:3001/api/projects`
- `http://localhost:3001/api/products`

8. Prisma Studio (opcional):

```powershell
npm run prisma:studio
```

## Scripts utiles

- `npm run db:up`: inicia PostgreSQL Docker en segundo plano.
- `npm run db:down`: detiene el contenedor.
- `npm run db:logs`: logs en tiempo real de PostgreSQL.
- `npm run prisma:generate`: genera cliente Prisma.
- `npm run prisma:migrate`: crea/aplica migraciones de desarrollo.
- `npm run prisma:seed`: ejecuta `prisma/seed.js`.
- `npm run db:reset`: resetea DB de desarrollo con Prisma.

## Endpoints publicos

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:slug`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/contacts`

Filtros:

- `GET /api/projects?status=published&featured=true`
- `GET /api/products?status=published&featured=true&type=template`

## Endpoints admin (x-admin-token)

Projects:

- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`

Services:

- `GET /api/admin/services`
- `POST /api/admin/services`
- `PUT /api/admin/services/:id`
- `DELETE /api/admin/services/:id`

Products:

- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`

Contacts:

- `GET /api/admin/contacts`
- `PUT /api/admin/contacts/:id/status`

Header requerido:

```http
x-admin-token: <ADMIN_API_TOKEN>
```

Si `ADMIN_API_TOKEN` no esta configurado, rutas admin responden `401`.

## Nota de seguridad

La proteccion actual por `x-admin-token` es una capa minima para desarrollo local. Antes de produccion se debe implementar autenticacion/autorizacion real (usuarios, sesiones/JWT, roles, rotacion de credenciales y auditoria).

## SQL legacy

El proyecto ahora usa Prisma como fuente principal de esquema y migraciones.

Los SQL previos se conservaron como referencia en:

- `backend/sql-legacy/YorureiStudioDB.sql`
- `backend/sql-legacy/seed.sql`
