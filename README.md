# AKAI-STUDIO

Repositorio principal de Akai Studio con separación profesional de frontend y backend.

## Estructura

- `frontend/`: aplicación web React + Vite + Tailwind desplegable en Cloudflare.
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

Si el proyecto ya estaba conectado con carpeta raíz `akai-studio`, actualiza el **Root directory** a `frontend`.
El comando de build sigue siendo `npm run build` y el output directory sigue siendo `dist`.
