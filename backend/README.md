# Akai Studio Backend

Backend local para exponer la API de soporte usada por la ruta `/usuarios` del frontend.

## Requisitos

- Node.js 18+
- Base de datos PostgreSQL accesible localmente

## Configuración

1. Copiar variables de entorno:

```bash
cp .env.example .env
```

2. Ajustar credenciales de base de datos en `.env`.

## Scripts

- `npm run dev`: inicia el servidor en modo desarrollo.
- `npm run start`: inicia el servidor.
- `npm run prisma:generate`: genera cliente Prisma (si se agrega schema).
- `npm run prisma:migrate`: ejecuta migraciones Prisma (si se agrega schema).

## API actual

- `GET /api/usuarios`: devuelve listado de usuarios desde PostgreSQL.
